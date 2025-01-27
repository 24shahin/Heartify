import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        headers.set("Authorization", `bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth",
        method: "POST",
        body,
      }),
    }),
    logedInUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
    }),
    EmailVarifiedUser: builder.mutation({
      query: ({ token, userToken }) => ({
        url: "/api/v1/auth/emailVerifing",
        method: "POST",
        body: { token },
        headers: {
          Authorization: `bearer ${userToken}`,
        },
      }),
    }),
    reVerification: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/reverifing",
        method: "POST",
      }),
    }),
    searchUser: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/resetpassword",
        method: "POST",
        body: { email },
      }),
    }),
    Sendcode: builder.mutation({
      query: (email) => ({
        url: "/api/v1/auth/codesend",
        method: "POST",
        body: { email },
      }),
    }),
    matchResetCode: builder.mutation({
      query: ({ email, code }) => ({
        url: "/api/v1/auth/verifingresetcode",
        method: "POST",
        body: { email, code },
      }),
    }),
    passwordChange: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/v1/auth/changepassword",
        method: "POST",
        body: { email, password },
      }),
    }),
    uploadPostImages: builder.mutation({
      query: ({ formData }) => ({
        url: "/api/v1/upload/images",
        method: "POST",
        body: formData,
      }),
    }),
    createPost: builder.mutation({
      query: ({ type, images, text, background, user }) => ({
        url: "/api/v1/post/createpost",
        method: "POST",
        body: { type, images, text, background, user },
      }),
      transformResponse: (resposne) => ({
        status: "done",
        data: resposne,
      }),
    }),
    getAllPosts: builder.query({
      query: () => "/api/v1/post/getallposts",
    }),
    getUserInfo: builder.query({
      query: (username) => `/api/v1/auth/getuserinfo/${username}`,
    }),
    getUserImages: builder.mutation({
      query: ({ path, sort, max }) => ({
        url: "/api/v1/upload/getimageslist",
        method: "POST",
        body: { path, sort, max },
      }),
    }),
    uploadProfilePicture: builder.mutation({
      query: ({ url }) => ({
        url: "/api/v1/auth/uploadprofilepicture",
        method: "PUT",
        body: { url },
      }),
      transformResponse: (resposne) => ({
        status: "done",
        data: resposne,
      }),
    }),
    uploadCoverPicture: builder.mutation({
      query: ({ url }) => ({
        url: "/api/v1/auth/uploadcoverpicture",
        method: "PUT",
        body: { url },
      }),
      transformResponse: (resposne) => ({
        status: "done",
        data: resposne,
      }),
    }),
    uploadUserDetails: builder.mutation({
      query: ({ infos }) => ({
        url: "/api/v1/auth/uploaduserdtails",
        method: "PUT",
        body: { infos },
      }),
    }),

    addFriendRequests: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/auth/addfriendrequests/${id}`,
        method: "PUT",
      }),
    }),
    cancleRequest: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/auth/canclerequest/${id}`,
        method: "PUT",
      }),
    }),
    accpetRequest: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/auth/acceptrequest/${id}`,
        method: "PUT",
      }),
    }),
    follow: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/auth/follow/${id}`,
        method: "PUT",
      }),
    }),
    unFollow: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/auth/unfollow/${id}`,
        method: "PUT",
      }),
    }),
    unFriend: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/auth/unfriend/${id}`,
        method: "PUT",
      }),
    }),
    deletRequest: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/auth/deleterequest/${id}`,
        method: "PUT",
      }),
    }),
    postReacts: builder.mutation({
      query: ({ postId, react }) => ({
        url: `/api/v1/reacts/react`,
        method: "PUT",
        body: { postId, react },
      }),
    }),

    getAllReact: builder.query({
      query: ({ id }) => `/api/v1/reacts/getallreact/${id}`,
    }),
    createComment: builder.mutation({
      query: ({ comment, image, postId }) => ({
        url: "/api/v1/post/comment",
        method: "PUT",
        body: { comment, image, postId },
      }),
    }),
    savePost: builder.mutation({
      query: (postId) => ({
        url: `/api/v1/post/savepost/${postId}`,
        method: "PUT",
      }),
    }),
    removePost: builder.mutation({
      query: (postId) => ({
        url: `/api/v1/post/removepost/${postId}`,
        method: "DELETE",
      }),
    }),
    searchQuery: builder.mutation({
      query: (searchTerm) => ({
        url: `/api/v1/auth/search/${searchTerm}`,
        method: "POST",
      }),
    }),
    addSearchHistory: builder.mutation({
      query: ({ searchUser }) => ({
        url: "/api/v1/auth/addsearchhistory",
        method: "PUT",
        body: { searchUser },
      }),
    }),
    getSearchhHistory: builder.query({
      query: () => "/api/v1/auth/getsearchhistory",
    }),
    removeSearchHistory: builder.mutation({
      query: ({ removeSearchUser }) => ({
        url: "/api/v1/auth/removesearchhistory",
        method: "PUT",
        body: { removeSearchUser },
      }),
    }),
    getAllFriends: builder.query({
      query: () => "/api/v1/auth/getallfriends",
    }),
  }),
});

export const {
  useAddUserMutation,
  useLogedInUserMutation,
  useEmailVarifiedUserMutation,
  useReVerificationMutation,
  useSearchUserMutation,
  useSendcodeMutation,
  useMatchResetCodeMutation,
  usePasswordChangeMutation,
  useCreatePostMutation,
  useUploadPostImagesMutation,
  useGetAllPostsQuery,
  useGetUserInfoQuery,
  useGetUserImagesMutation,
  useUploadProfilePictureMutation,
  useUploadCoverPictureMutation,
  useUploadUserDetailsMutation,
  useCancleRequestMutation,
  useAccpetRequestMutation,
  useDeletRequestMutation,
  useFollowMutation,
  useUnFollowMutation,
  useUnFriendMutation,
  useAddFriendRequestsMutation,
  usePostReactsMutation,
  useGetAllReactQuery,
  useCreateCommentMutation,
  useSavePostMutation,
  useRemovePostMutation,
  useSearchQueryMutation,
  useAddSearchHistoryMutation,
  useGetSearchhHistoryQuery,
  useRemoveSearchHistoryMutation,
  useGetAllFriendsQuery,
} = authApi;
