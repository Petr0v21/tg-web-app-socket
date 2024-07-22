import { usePathname } from "next/navigation";
import React, { useState, createContext, useContext, useEffect } from "react";

function provideComponent(props: React.ReactNode, key: string) {}
function noop(key: string) {}
function isOpen(key: string) {
  return false;
}

interface ModalContextInterface {
  open: (props: React.ReactNode, key: string) => void;
  isOpen: (key: string) => boolean;
  close: (key: string) => void;
}

const ModalContext = createContext<ModalContextInterface | null>({
  open: provideComponent,
  close: noop,
  isOpen: isOpen,
});

export const useModal = () => useContext(ModalContext);

const ModalProvider: React.FC<React.PropsWithChildren> = (props) => {
  const pathname = usePathname();
  const [modalList, setModalList] = useState<
    {
      key: string;
      isOpen: boolean;
      component: React.ReactNode | null;
    }[]
  >([]);
  const open = (props: React.ReactNode, key: string) => {
    setModalList([
      ...modalList,
      {
        key,
        isOpen: true,
        component: props,
      },
    ]);
  };

  const isOpen = (key: string) => {
    return !!modalList.find((item) => key === item.key);
  };

  const close = (key: string) => {
    setModalList(modalList.filter((item) => key !== item.key));
  };

  useEffect(() => {
    setModalList([]);
  }, [pathname]);
  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {modalList.map(({ isOpen, component, key }, index) => (
        <div
          key={key}
          style={{
            position: "relative",
            display: isOpen ? "block" : "none",
            zIndex: 988,
          }}
        >
          <div
            onClick={() => {
              close(key);
            }}
            className="modal-back"
            style={{
              position: "fixed",
              zIndex: 1001 + index - 2,
              width: "100vw",
              height: "100vh",
              background: "rgba(23, 22, 21, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          ></div>
          {isOpen && (
            <div
              className="modal-content"
              style={{
                position: "relative",
                zIndex: 1002 + index - 2,
              }}
            >
              {component}
            </div>
          )}
        </div>
      ))}
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
