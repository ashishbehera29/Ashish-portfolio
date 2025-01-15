import { atom, useAtom } from "jotai";
import logo from '../assets/LOGO AB.png'; // Import the image
import { useEffect } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip.mp3");
    audio.play();
  }, [page]);

  const scrollAnimation = {
    display: 'flex',
    width: 'max-content',
    animation: 'horizontal-scroll 80s linear infinite', // Increased duration to slow down the animation
  };

  const keyframes = `
    @keyframes horizontal-scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>

      <main className="pointer-events-none select-none z-10 fixed inset-0 flex flex-col justify-between">
        <div className="flex justify-between items-center p-6">
          <img src={logo} alt="Logo" className="h-20 w-20" />
          <p className="text-white text-xs">Zoom in, zoom out, and move the book for a better experience</p>
          <h4 className="text-white text-m">Ashish </h4>
        </div>
       
        <div className="w-full overflow-auto pointer-events-auto flex justify-center mt-4">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none">
        <div className="relative">
          <div style={scrollAnimation}>
            <h1 className="shrink-0 text-white text-10xl font-black">
              Hello!! My name is Ashish Behera. I am a FullStack Web Developer . Graphics Designer . UI/UX Designer . Photographer . Video Editor .
            </h1>
            <h1 className="shrink-0 text-white text-10xl font-black">
              Hello!! My name is Ashish Behera. I am a FullStack Web Developer . Graphics Designer . UI/UX Designer . Photographer . Video Editor .
            </h1>
            <h1 className="shrink-0 text-white text-10xl font-black">
              Hello!! My name is Ashish Behera. I am a FullStack Web Developer . Graphics Designer . UI/UX Designer . Photographer . Video Editor .
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
