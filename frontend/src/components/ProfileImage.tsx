import { Image, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import User from "../interfaces/User";

interface ProfileImageProps {
  user: User;
  size: string;
}

const ProfileImage: FunctionComponent<ProfileImageProps> = ({ user, size }) => {
  const src =
    user.image || `https://avatars.dicebear.com/api/identicon/${user._id}.svg`;

  return (
    <>
      <Image
        shadow="md"
        rounded="full"
        boxSize={size}
        src={src}
        alt="Profile Image"
      />
    </>
  );
};

export default ProfileImage;
