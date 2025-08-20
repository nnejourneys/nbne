import * as runtime from "react/jsx-runtime";
import { H1 } from "../ui/h1";
import { H2 } from "../ui/h2";
import { H3 } from "../ui/h3";
import { H4 } from "../ui/h4";
import { H5 } from "../ui/h5";
import { H6 } from "../ui/h6";
import { P } from "../ui/p";
import { ListItem, OrderedList, UnorderedList } from "../ui/lists";
import R2Image from "../styledcomps/R2Image";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  R2Image,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
