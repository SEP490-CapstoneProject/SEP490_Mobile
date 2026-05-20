import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    AlertCircle,
    Edit3,
    Eye,
    MoreVertical,
    Plus,
    Trash2,
} from "lucide-react-native";

import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import CustomLoading from "@/components/CustomLoading";
import {
    deleteChallenge,
    fetchCreatorChallenges,
} from "@/services/challenge.api";
import { formatToLocalTime } from "@/services/time";
import { Challenge } from "@/utils/challenge";
import { showError, showSuccess } from "@/utils/toast";
import CreateChallengeForm from "./CreateChallengeForm";

function ChallengeCard({
  challenge,
  onEdit,
  onDelete,
  onViewDetail,
}: {
  challenge: Challenge;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetail: (id: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const formattedDeadline = formatToLocalTime(challenge.deadline);

  const cleanDeadlineStr = challenge.deadline.endsWith("Z")
    ? challenge.deadline
    : challenge.deadline + "Z";

  const isExpired = new Date(cleanDeadlineStr) < new Date();

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "Draft":
        return {
          label: "Nháp",
          bg: "#E2E8F0",
          color: "#1E293B",
        };

      case "PendingReview":
        return {
          label: "Chờ duyệt",
          bg: "#FEF3C7",
          color: "#92400E",
        };

      case "Published":
        return {
          label: "Đã xuất bản",
          bg: "#DCFCE7",
          color: "#166534",
        };

      case "Rejected":
        return {
          label: "Đã từ chối",
          bg: "#FEE2E2",
          color: "#991B1B",
        };

      case "Expired":
        return {
          label: "Đã hết hạn",
          bg: "#FEE2E2",
          color: "#991B1B",
        };

      default:
        return {
          label: status,
          bg: "#E2E8F0",
          color: "#1E293B",
        };
    }
  };

  const statusDisplay = getStatusDisplay(challenge.status ?? "");

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{challenge.title}</Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusDisplay.bg,
              },
            ]}
          >
            <Text
              style={{
                color: statusDisplay.color,
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              {statusDisplay.label}
            </Text>
          </View>
        </View>

        <View style={{ position: "relative" }}>
          <TouchableOpacity
            onPress={() => setShowMenu(!showMenu)}
            style={styles.menuButton}
          >
            <MoreVertical size={18} color="#475569" />
          </TouchableOpacity>

          {showMenu && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  onViewDetail(challenge.id);
                  setShowMenu(false);
                }}
              >
                <Eye size={14} color="#334155" />
                <Text style={styles.dropdownText}>Chi tiết</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  onEdit(challenge.id);
                  setShowMenu(false);
                }}
              >
                <Edit3 size={14} color="#334155" />
                <Text style={styles.dropdownText}>Chỉnh sửa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  onDelete(challenge.id);
                  setShowMenu(false);
                }}
              >
                <Trash2 size={14} color="red" />
                <Text style={[styles.dropdownText, { color: "red" }]}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {!!challenge.description && (
        <Text numberOfLines={2} style={styles.description}>
          {challenge.description}
        </Text>
      )}

      <View style={{ gap: 8 }}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Hạn chót:</Text>
          <Text style={styles.infoValue}>{formattedDeadline}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Trạng thái:</Text>

          <Text
            style={{
              fontWeight: "600",
              color: isExpired ? "#DC2626" : "#16A34A",
            }}
          >
            {isExpired ? "Đã hết hạn" : "Còn hạn"}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ChallengeManagement() {
  const router = useRouter();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [deletingChallengeId, setDeletingChallengeId] = useState<string | null>(
    null,
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [editingChallengeId, setEditingChallengeId] = useState<string | null>(
    null,
  );

  const loadChallenges = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchCreatorChallenges(0, 100);

      setChallenges(response.items || []);
    } catch (err: any) {
      console.log(err);
      setError(err?.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  const handleEdit = (id: string) => {
    setEditingChallengeId(id);
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setDeletingChallengeId(id);
  };

  const handleViewDetail = (id: string) => {
    router.push({
      pathname: "/(tabs)/home/challenge/ChallengeDetailRecruiter",
      params: { challengeId: id },
    });
  };

  const handleConfirmDelete = async () => {
    if (!deletingChallengeId) return;

    try {
      setIsDeleting(true);

      await deleteChallenge(deletingChallengeId);

      setChallenges((prev) => prev.filter((c) => c.id !== deletingChallengeId));

      showSuccess("Xóa thử thách thành công", "");

      setDeletingChallengeId(null);
    } catch (err: any) {
      showError("Xóa thất bại", "err?.message ");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomLoading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Quản lý thử thách</Text>

            <Text style={styles.headerDesc}>Tạo và quản lý thử thách</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setEditingChallengeId(null);
              setShowCreateForm(true);
            }}
          >
            <Plus size={18} color="#fff" />
            <Text style={styles.addButtonText}>Thêm</Text>
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <AlertCircle size={20} color="#DC2626" />

            <View style={{ flex: 1 }}>
              <Text style={styles.errorTitle}>Lỗi</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </View>
        )}

        {challenges.length === 0 ? (
          <View style={styles.emptyContainer}>
            <AlertCircle size={48} color="#94A3B8" />

            <Text style={styles.emptyTitle}>Chưa có thử thách nào</Text>

            <Text style={styles.emptyText}>Hãy tạo thử thách đầu tiên</Text>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetail={handleViewDetail}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* DELETE MODAL */}
      <Modal transparent visible={!!deletingChallengeId} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Xác nhận xóa</Text>

            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa thử thách này?
            </Text>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setDeletingChallengeId(null)}
              >
                <Text>Hủy</Text>
              </Pressable>

              <Pressable style={styles.deleteBtn} onPress={handleConfirmDelete}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  {isDeleting ? "Đang xóa..." : "Xóa"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* FORM */}
      {showCreateForm && (
        <CreateChallengeForm
          challengeId={editingChallengeId}
          onClose={() => {
            setShowCreateForm(false);
            setEditingChallengeId(null);
          }}
          onSuccess={() => {
            loadChallenges();
            setShowCreateForm(false);
            setEditingChallengeId(null);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  loadingContainer: {
    flex: 1,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },

  backText: {
    color: "#2563EB",
    fontWeight: "600",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#0F172A",
  },

  headerDesc: {
    marginTop: 4,
    color: "#64748B",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  menuButton: {
    padding: 8,
  },

  dropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    zIndex: 99,
    elevation: 5,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },

  dropdownText: {
    fontSize: 14,
    color: "#334155",
  },

  description: {
    color: "#475569",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoLabel: {
    color: "#64748B",
  },

  infoValue: {
    color: "#0F172A",
    fontWeight: "500",
  },

  errorBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  errorTitle: {
    fontWeight: "700",
    color: "#991B1B",
  },

  errorText: {
    color: "#B91C1C",
    marginTop: 2,
  },

  emptyContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  emptyText: {
    color: "#64748B",
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  modalText: {
    color: "#475569",
    marginBottom: 20,
  },

  modalActions: {
    flexDirection: "row",
    gap: 12,
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
