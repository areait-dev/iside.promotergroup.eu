import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./icons";
import { isTodo } from "@/config/site";

export type Social = { instagram: string; facebook: string; linkedin: string };

/** Social configurati (quelli vuoti o ancora "TODO" non compaiono). */
export function socialNetworks(social: Social) {
  return [
    { label: "Instagram", href: social.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: social.facebook, Icon: FacebookIcon },
    { label: "LinkedIn", href: social.linkedin, Icon: LinkedinIcon },
  ].filter((n) => !isTodo(n.href));
}
