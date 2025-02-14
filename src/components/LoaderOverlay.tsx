import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface LoaderOverlayProps {
  isLoading: boolean;
}

export const LoaderOverlay: React.FC<LoaderOverlayProps> = ({ isLoading }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isLoading) return null;
  return createPortal(
    <>
      <div className="overlay">
        <div className="loader2"></div>
      </div>

      <style>
        {true}
        {`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
          border-radius: 8px;
        }

        .loader2 {
          width: 50px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: 
            radial-gradient(farthest-side, #ffa516 94%, #0000) top/8px 8px no-repeat,
            conic-gradient(#0000 30%, #ffa516);
          -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
          animation: l13 1s infinite linear;
        }

        @keyframes l13 {
          100% {
            transform: rotate(1turn);
          }
        }
      `}
      </style>
    </>,
    document.body
  );
};
