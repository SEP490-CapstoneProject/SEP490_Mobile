import MediaGrid from "@/components/MediaGrid";
import {
    CommunityPost,
    fetchPostComments,
    fetchPostDetail,
    PostCommentsResponse,
} from "@/services/Comunity.api";
import { formatTimeAgo } from "@/services/setTime";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Comment() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const router = useRouter();
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [commentsData, setCommentsData] = useState<PostCommentsResponse | null>(
    null,
  );
  type ReplyTarget = {
    commentId: number;
    userId: number;
    name: string;
  };

  const [replyingTo, setReplyingTo] = useState<ReplyTarget | null>(null);
  const [openRep, setOpenRep] = useState(false);

  useEffect(() => {
    const id = Number(postId);
    if (Number.isNaN(id)) return;

    Promise.all([fetchPostDetail(id), fetchPostComments(id)]).then(
      ([postRes, commentsRes]) => {
        setPost(postRes);
        setCommentsData(commentsRes);
      },
    );
  }, [postId]);
  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.titleContainer}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/myApp/arrow.png")}
            style={styles.titleIcon}
          />
        </Pressable>
        <Text style={styles.title}>Bình luận</Text>
      </View>
      {/* content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/** header content **/}
          <View style={styles.headerContent}>
            <View style={styles.headerContentLeft}>
              <View style={styles.avataContainer}>
                <Image
                  source={{ uri: post?.author?.avatar }}
                  style={styles.avata}
                />
                {post?.author?.role === "COMPANY" && (
                  <Image
                    source={require("../../../assets/myApp/checklist.png")}
                    style={styles.avataIcon}
                  />
                )}
              </View>

              <View>
                <Text style={styles.name}>{post?.author?.name}</Text>
                <Text style={styles.time}>
                  {formatTimeAgo(post?.createdAt ?? "")}
                </Text>
              </View>
            </View>
            <Pressable>
              <Image
                source={require("../../../assets/myApp/option.png")}
                style={styles.iconHeaderLeft}
              />
            </Pressable>
          </View>
          {/** body content */}
          <View>
            <Text style={styles.textContent}>{post?.description}</Text>
            {post?.link && (
              <Pressable style={styles.linkContainer}>
                <Image
                  source={require("../../../assets/myApp/link.png")}
                  style={styles.iconLinkbody}
                />
                <Text style={styles.textLinkBody}>Xem chi tiết</Text>
              </Pressable>
            )}
            {post?.media && post?.media.length > 0 && (
              <MediaGrid media={post?.media} />
            )}
          </View>
          {/** footer content */}
          <View style={styles.footerContainer}>
            <View style={styles.favoriteCount}>
              <Image
                source={require("../../../assets/myApp/heartA (1).png")}
                style={[
                  styles.footerIcon,
                  post?.isFavorited ? { tintColor: "#FF4848" } : {},
                ]}
              />
              <Text style={styles.textFavoriteCount}>
                {post?.favoriteCount}
              </Text>
            </View>
            <Pressable style={styles.favoriteCount}>
              <Image
                source={require("../../../assets/myApp/message.png")}
                style={styles.footerIcon}
              />
              <Text style={styles.textFavoriteCount}>{post?.commentCount}</Text>
            </Pressable>
            <Image
              source={require("../../../assets/myApp/bookmark.png")}
              style={[
                styles.footerIcon,
                post?.isSaved ? { tintColor: "#FFD700" } : {},
              ]}
            />
            <Image
              source={require("../../../assets/myApp/share-.png")}
              style={[styles.footerIcon]}
            />
          </View>
        </View>
        {/** Comments Section */}
        <View style={{ flex: 1 }}>
          {commentsData && commentsData.comments.length > 0 ? (
            commentsData.comments.map((comment) => (
              <View key={comment.id}>
                {/* COMMENT CHA */}
                <View style={styles.commentRow}>
                  {/* Avatar cha */}
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={{ uri: comment.author.avatar }}
                      style={styles.avataComment}
                    />
                    {comment.author.role === "COMPANY" && (
                      <Image
                        source={require("../../../assets/myApp/checklist.png")}
                        style={styles.avatarBadge}
                      />
                    )}
                  </View>

                  {/* Nội dung cha */}
                  <View style={styles.commentBody}>
                    <View style={styles.backgroundComment}>
                      <Text style={styles.nameComment}>
                        {comment.author.name}
                      </Text>
                      <Text style={styles.textComment}>{comment.content}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 25,
                        marginTop: 4,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text style={styles.replyBtn}>
                        {formatTimeAgo(comment.createdAt)}
                      </Text>
                      <Pressable
                        onPress={() =>
                          setReplyingTo({
                            commentId: comment.id,
                            userId: comment.author.id,
                            name: comment.author.name,
                          })
                        }
                      >
                        <Text style={styles.replyBtn}>Trả lời</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

                {/* REPLY LIST */}
                {comment.replies.length > 0 && (
                  <View style={styles.replyContainer}>
                    {/* GẠCH DỌC */}
                    <View style={styles.replyLine} />
                    {openRep === false ? (
                      <View>
                        <Pressable onPress={() => setOpenRep(true)}>
                          <Text style={{ color: "#3B82F6", marginBottom: 10 }}>
                            Xem câu trả lời ({comment.replies.length})
                          </Text>
                        </Pressable>
                      </View>
                    ) : (
                      <View>
                        {comment.replies.map((reply) => (
                          <View key={reply.id} style={styles.replyRow}>
                            {/* Avatar cha */}
                            <View style={styles.avatarWrapper}>
                              <Image
                                source={{ uri: reply.author.avatar }}
                                style={styles.avataComment}
                              />
                              {comment.author.role === "COMPANY" && (
                                <Image
                                  source={require("../../../assets/myApp/checklist.png")}
                                  style={styles.avatarBadge}
                                />
                              )}
                            </View>
                            {/* Nội dung cha */}
                            <View style={styles.replyBody}>
                              <View style={styles.backgroundReply}>
                                <View style={{ flexDirection: "row", gap: 5 }}>
                                  <Text style={styles.nameComment}>
                                    {reply.author.name}
                                  </Text>
                                  <Text
                                    style={{ fontSize: 15, color: "#475569" }}
                                  >
                                    trả lời
                                  </Text>
                                  <Text style={styles.nameComment}>
                                    {reply.replyToUser.name}
                                  </Text>
                                </View>

                                <Text style={styles.textComment}>
                                  {reply.content}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: 4,
                                  marginHorizontal: 10,
                                  gap: 25,
                                }}
                              >
                                <Text style={styles.replyBtn}>
                                  {formatTimeAgo(comment.createdAt)}
                                </Text>
                                <Pressable
                                  onPress={() =>
                                    setReplyingTo({
                                      commentId: comment.id,
                                      userId: reply.author.id,
                                      name: reply.author.name,
                                    })
                                  }
                                >
                                  <Text style={styles.replyBtn}>Trả lời</Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        ))}
                        <View>
                          <Pressable onPress={() => setOpenRep(false)}>
                            <Text
                              style={{ color: "#3B82F6", marginBottom: 10 }}
                            >
                              Đóng câu trả lời
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))
          ) : (
            <View style={styles.noCOmmentContainer}>
              <Text style={styles.noCommentText}>Chưa có bình luận nào</Text>
              <Text style={styles.noCommentSubText}>
                Hãy là người đầu tiên bình luận về bài viết này!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/** comment input */}
      <View style={styles.inputContainer}>
        {replyingTo && (
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              gap: 10,
              paddingTop: 5,
            }}
          >
            <Text style={styles.replyingToText}>
              Đang trả lời {replyingTo.name}
            </Text>
            <Pressable onPress={() => setReplyingTo(null)}>
              <Text style={{ color: "#111827" }}>
                {replyingTo ? "Hủy" : ""}
              </Text>
            </Pressable>
          </View>
        )}

        <View style={styles.commentInput}>
          <TextInput
            placeholder={"Viết bình luận..."}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={styles.textInput}
          />
          <Pressable style={styles.sendContainer}>
            <Image
              source={require("../../../assets/myApp/send.png")}
              style={styles.send}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 5,
    gap: 20,
    paddingVertical: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleIcon: {
    width: 24,
    height: 24,
  },

  contentContainer: {
    width: "100%",
    height: "auto",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopWidth: 2,
    borderTopColor: "#E2E8F0",
    borderBottomWidth: 2,
    borderBottomColor: "#E2E8F0",
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  headerContentLeft: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
  },
  avataContainer: {
    position: "relative",
  },
  avata: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avataIcon: {
    width: 15,
    height: 15,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#6B7280",
  },
  iconHeaderLeft: {
    width: 20,
    height: 20,
  },
  textContent: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  iconLinkbody: {
    width: 15,
    height: 15,
  },
  textLinkBody: {
    fontSize: 15,
    color: "#3B82F6",
  },
  footerContainer: {
    borderTopColor: "#E2E8F0",
    borderTopWidth: 1,
    marginTop: 15,
    flexDirection: "row",
    gap: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  footerIcon: {
    width: 25,
    height: 25,
    tintColor: "#cbd2dcff",
  },
  favoriteCount: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  textFavoriteCount: {
    color: "#6B7280",
    fontSize: 13,
  },
  noCOmmentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noCommentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noCommentSubText: {
    fontSize: 14,
    color: "#6B7280",
  },
  avataComment: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  nameComment: {
    fontSize: 15,
    fontWeight: "bold",
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  avatarWrapper: {
    width: 45,
    height: 45,
    position: "relative",
    flexShrink: 0,
  },

  avatarBadge: {
    width: 15,
    height: 15,
    position: "absolute",
    bottom: -2,
    right: -2,
  },

  commentBody: {
    marginLeft: 10,
    maxWidth: "85%",
  },

  backgroundComment: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: "flex-start",
    gap: 5,
  },

  textComment: {
    fontSize: 15,
    lineHeight: 20,
    color: "#475569",
  },

  replyBtn: {
    marginTop: 4,
    fontSize: 13,
    color: "#475569",
  },

  replyContainer: {
    marginLeft: 45,
    marginTop: 10,
    position: "relative",
    marginBottom: 15,
  },

  replyLine: {
    position: "absolute",
    left: -10,
    top: -50,
    bottom: 20,
    width: 2,
    backgroundColor: "#E5E7EB",
    borderRadius: 1,
  },

  replyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  replyAvatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
  },
  inputContainer: {
    borderBottomColor: "#E2E8F0",
    borderTopColor: "#E2E8F0",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "#EFF6FF",
  },
  replyingToText: {
    color: "#6B7280",
  },
  commentInput: {
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-around",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    width: 250,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15.5,
  },
  sendContainer: {
    backgroundColor: "#3B82F6",
    width: 40,
    height: 40,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  send: {
    width: 23,
    height: 23,
  },
  replyBody: {
    marginLeft: 10,
    maxWidth: "80%",
  },
  backgroundReply: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: "flex-start",
    gap: 5,
  },
});
