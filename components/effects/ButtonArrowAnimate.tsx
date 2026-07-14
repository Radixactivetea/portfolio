import { ArrowUpRightIcon } from "lucide-react";

import {
  CraftButton,
  CraftButtonLabel,
  CraftButtonIcon,
} from "@/components/ui/craft-button";

const ButtonArrowAnimate = ({ string, href }: { string: string, href: string }) => {
  return (
    <CraftButton className="p-6" href={href}>
      <CraftButtonLabel>{string}</CraftButtonLabel>
      <CraftButtonIcon>
        <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45 group-active:rotate-45" />
      </CraftButtonIcon>
    </CraftButton>
  );
};

export default ButtonArrowAnimate;