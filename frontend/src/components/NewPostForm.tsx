import React, { useState, FunctionComponent, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import QuillEditor from "./QuillEditor";
import { getAllCategories } from "../services/categoryService";
import Post from "../interfaces/Post";
import PostPreview from "./PostPreview";
import { checkJsfiddleUrl } from "../services/checkJsfiddleUrl";

interface ParentProps {}

const NewFormPost: FunctionComponent<ParentProps> = () => {
  const baseUserStats = {
    author_name: "Alex",
    date: new Date(69),

    viewed_by_user_ids: [],
    comment_ids: [],
    like_user_ids: [],
  };

  const [post, setPost] = useState<Post>({
    title: "Title",
    url: "",
    categories: [],

    ...baseUserStats,
  });

  const [quillDelta, setQuillDelta] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoriesTouched, setSelectedCategoriesTouched] =
    useState<boolean>(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    url: Yup.string()
      .required("JSfiddle url is required")
      .matches(
        /^(?:https?:\/\/)?(?:www\.)?jsfiddle\.net\/[a-zA-Z0-9_]+\/[a-z0-9-]+$/i,
        "Must be a valid jsfiddle url (eg. https://www.jsfiddle.net/[username]/[fiddleId])"
      ),
  });

  const handleSubmit = async (e: any) => {
    console.log("Form values:", e.target);
    console.log("Quill Delta:", quillDelta);

    // Process form data and submit to the forum
  };

  const handleTestUrlClick = async (url: string) => {
    const res = await checkJsfiddleUrl(url);
    if (res) setPost({ ...post, url });
    console.log(res);
  };

  const fetchCategories = async () => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch(console.log);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container maxW="8xl">
      <Formik
        initialValues={{ title: "Title", url: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={handleSubmit}>
            <Flex flexDir="column">
              {/* Title */}
              <Flex gap="8" p="8">
                <Flex flexDir="column" gap="4" w="100%">
                  <FormControl
                    id="title"
                    isInvalid={!!formik.errors.title && formik.touched.title}
                  >
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Field
                      as={Input}
                      bgColor="white"
                      id="title"
                      name="title"
                      type="text"
                      size="sm"
                      value={formik.values.title}
                      onChange={(e: any) => {
                        formik.values.title = e.target.value;
                        setPost({ ...post, title: formik.values.title });
                      }}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
                    ) : (
                      <FormHelperText>
                        Please provide a title for your post
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* URL */}
                  <FormControl
                    id="url"
                    isInvalid={!!formik.errors.url && formik.touched.url}
                  >
                    <FormLabel htmlFor="url">JSFiddle URL</FormLabel>
                    <Field
                      as={Input}
                      bgColor="white"
                      id="url"
                      name="url"
                      type="text"
                      size="sm"
                    />
                    <Flex justify="space-between">
                      {formik.touched.url && formik.errors.url ? (
                        <FormErrorMessage>{formik.errors.url}</FormErrorMessage>
                      ) : (
                        <FormHelperText>
                          Please provide a{" "}
                          <Link
                            href="https://jsfiddle.net"
                            color="teal"
                            textDecor="underline"
                            isExternal
                          >
                            JSFiddle
                          </Link>{" "}
                          url.
                        </FormHelperText>
                      )}
                      <Button
                        mt="2"
                        colorScheme="teal"
                        size="xs"
                        onClick={() => handleTestUrlClick(formik.values.url)}
                      >
                        Check url
                      </Button>
                    </Flex>
                  </FormControl>

                  {/* Tags */}
                  <FormControl id="categories">
                    <Flex flexDir="column">
                      <FormLabel>Categories</FormLabel>
                      <Flex flexDir="column">
                        <Flex gap="2">
                          {categories &&
                            categories.map(
                              (category: any) =>
                                !selectedCategories.includes(category) && (
                                  <Tag
                                    key={category._id}
                                    bgColor="white"
                                    colorScheme="teal"
                                    variant="outline"
                                    size="lg"
                                    cursor="pointer"
                                    onClick={() => {
                                      setSelectedCategories([
                                        ...selectedCategories,
                                        category,
                                      ]);
                                      setSelectedCategoriesTouched(true);
                                    }}
                                  >
                                    <TagLeftIcon as={AddIcon} boxSize="3" />
                                    <TagLabel>{category.value}</TagLabel>
                                  </Tag>
                                )
                            )}
                        </Flex>
                        <Box mt="2">
                          {selectedCategories.length === 0 &&
                            categoriesTouched && (
                              <Text fontSize="sm" color="red.500">
                                Please select at least one category
                              </Text>
                            )}
                          {!categoriesTouched && (
                            <FormHelperText>
                              Please select a category.
                            </FormHelperText>
                          )}
                        </Box>
                      </Flex>

                      <FormLabel mt="6">Selected Categories</FormLabel>
                      <Flex gap="2">
                        {selectedCategories &&
                          selectedCategories.map((category: any) => (
                            <Tag
                              key={category._id}
                              cursor="pointer"
                              colorScheme="teal"
                              size="lg"
                              onClick={() => {
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (cat: any) => cat._id !== category._id
                                  )
                                );
                              }}
                            >
                              <TagLabel>{category.value}</TagLabel>
                              <TagCloseButton />
                            </Tag>
                          ))}
                      </Flex>
                    </Flex>
                  </FormControl>

                  {/* JSFiddle URL */}
                  <FormControl id="url" isInvalid></FormControl>
                </Flex>
                <FormControl w="min">
                  <FormLabel>Preview:</FormLabel>
                  <PostPreview post={post} />
                </FormControl>
              </Flex>

              {/* Quill Editor */}
              <QuillEditor setQuillDelta={setQuillDelta} />

              {/* Submit */}
              <Button
                type="submit"
                isLoading={formik.isSubmitting}
                isDisabled={
                  Object.keys(formik.errors).length > 0 ||
                  Object.keys(formik.touched).length !==
                    Object.keys(formik.values).length ||
                  selectedCategories.length === 0
                }
              >
                Post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewFormPost;
