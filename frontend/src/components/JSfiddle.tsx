import { Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface JSfiddleProps {
  url: string;
  title: string;
}

const JSfiddle: FunctionComponent<JSfiddleProps> = ({ title, url }) => {
  url = url.startsWith("http") ? url : "//" + url;

  return (
    <>
      <Box overflow="visible">
        <iframe
          title={title}
          width="100%"
          height="300"
          src={`${url}/embedded/result/?fontColor=555&accentColor=555&menuColor=F7FAFC`}
          allowFullScreen={true}
        ></iframe>
      </Box>
    </>
  );
};

export default JSfiddle;
