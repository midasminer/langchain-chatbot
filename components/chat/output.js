import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  HStack,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";

export default function ChatOuput({ messages, isLoading, ...properties }) {
  const loaderColor = useColorModeValue("gray.100", "white");
  const unevenBackgroundColor = useColorModeValue("gray.100", "#2F3239");
  const lastMessageReference = useRef();

  useEffect(() => {
    if (lastMessageReference?.current) {
      lastMessageReference?.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <Stack flex={1} maxWidth="100%" {...properties}>
      <Stack spacing={0}>
        {messages.map(({ agent, data: { response } }, index) => (
          <Box
            ref={
              index + 1 === messages.length ? lastMessageReference : undefined
            }
            padding={4}
            key={index}
            backgroundColor={index % 2 !== 0 && unevenBackgroundColor}
          >
            <HStack
              spacing={6}
              maxWidth="4xl"
              marginX="auto"
              alignItems="flex-start"
            >
              <Avatar src={agent ? "/chatbot.png" : "/user.png"} size="xs" />
              <Stack spacing={4} fontSize="sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {response}
                </ReactMarkdown>
              </Stack>
            </HStack>
          </Box>
        ))}
        {isLoading && (
          <Box padding={4} backgroundColor={unevenBackgroundColor}>
            <HStack maxWidth="4xl" marginX="auto" spacing={6}>
              <Avatar size="xs" src="/chatbot.png" />
              <Stack borderRadius="full" borderWidth="1px" padding={1}>
                <BeatLoader color={loaderColor} size={8} />
              </Stack>
            </HStack>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

ChatOuput.propTypes = {
  messages: PropTypes.array,
  isLoading: PropTypes.bool,
};
