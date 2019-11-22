import * as actions from "./actions";
import * as api from "./api";

import { ApiAction } from "store/types";
import {
  IReceiveAlbumAction,
  IReceivePhotosAction,
  IReceiveUserAction,
  IReceiveUserPostsAction,
} from "./types";

type DetailsAction =
  | IReceiveAlbumAction
  | IReceivePhotosAction
  | IReceiveUserAction
  | IReceiveUserPostsAction;

const loadDetails = (albumId: number): ApiAction<DetailsAction> => async (
  dispatch,
) => {
  const [{ data: albumData }, { data: photosData }] = await Promise.all([
    api.loadAlbum(albumId),
    api.loadPhotos(albumId),
  ]);
  dispatch(actions.receiveAlbum(albumData));
  dispatch(actions.receivePhotos(photosData));

  const [{ data: userData }, { data: userPostsData }] = await Promise.all([
    api.loadUser(albumData.userId),
    api.loadUserPosts(albumData.userId),
  ]);
  dispatch(actions.receiveUser(userData));
  dispatch(actions.receiveUserPosts(userPostsData));
};

export { loadDetails };
