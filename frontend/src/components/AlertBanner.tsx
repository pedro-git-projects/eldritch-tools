import { XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

interface BannerInfo {
  title: string;
  content: string;
  onClose: () => void;
  nextStepPath?: string;
}

type AlertBannerProps = BannerInfo;

export default function AlertBanner({
  title,
  content,
  onClose,
  nextStepPath,
}: AlertBannerProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-x-6 bg-cthulhu-secondary px-6 py-2.5 sm:px-3.5 sm:before:flex-1 rounded-md">
      <p className="text-sm/6">
        <a href="#">
          <strong className="font-semibold">{title}</strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-2 inline size-0.5 fill-current"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          {content}
        </a>
      </p>
      {nextStepPath && (
        <button
          type="button"
          className="rounded-md bg-cthulhu-teal px-3 py-2 text-sm text-cthulhu-dark font-semibold shadow-sm hover:bg-cthulhu-highlight"
          onClick={() => navigate(nextStepPath)}
        >
          Next Step
        </button>
      )}
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </div>
    </div>
  );
}
