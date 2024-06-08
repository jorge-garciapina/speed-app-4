import { Box, ImageListItem } from "@mui/material";
import { useContext } from "react";
import { SpeedTypeDispatchContext } from "../../general-store/context-provider";
import databaseSingleton from "../../utils/database-operations";
import { SpeedTypeContext } from "../../general-store/context-provider";

type ChangeAvatarImageElementPropsType = {
  src: string;
  title: string;
  closeModal: () => void;
};

export default function ChangeAvatarImageElement({
  src,
  title,
  closeModal,
}: ChangeAvatarImageElementPropsType) {
  const dispatch = useContext(SpeedTypeDispatchContext);
  const state = useContext(SpeedTypeContext);

  const srcSet = `${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`;

  // const srcSet = `${src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`;

  // const src = `${src}?w=164&h=164&fit=crop&auto=format`;

  async function handleAvatarSelection() {
    const validatedUserEmail = state?.validatedUserEmail || "";

    try {
      const result = await databaseSingleton.updateUserAvatar({
        email: validatedUserEmail,
        newAvatar: src,
      });

      if (result.success) {
        dispatch!({ type: "update-avatar", newAvatar: src });
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }

    closeModal();
  }
  return (
    <>
      <Box onClick={handleAvatarSelection}>
        <ImageListItem>
          <img srcSet={srcSet} src={src} alt={title} loading="lazy" />
        </ImageListItem>
      </Box>
    </>
  );
}
