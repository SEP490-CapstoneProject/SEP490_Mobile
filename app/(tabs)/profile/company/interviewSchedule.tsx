import InterviewDetailModal from "@/components/InterviewDetailModal";
import {
  fetchInterviewSchedule,
  InterviewItem,
} from "@/services/company/InterviewSchedule.api";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function InterviewSchedule() {
  const router = useRouter();
  const [interview, setInterview] = useState<InterviewItem[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const scrollRef = useRef<ScrollView>(null);
  const [selectedInterview, setSelectedInterview] =
    useState<InterviewItem | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    setSelectedDate(todayString);
    setCurrentMonth(today);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const index = days.findIndex((d) => d === selectedDate);

    if (index !== -1) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: index * 150,
          animated: false,
        });
      }, 1);
    }
  }, [selectedDate, currentMonth]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const days = new Date(year, month + 1, 0).getDate();

    const result = [];

    for (let i = 1; i <= days; i++) {
      const d = new Date(year, month, i);
      result.push(d.toISOString().split("T")[0]);
    }

    return result;
  };

  const formatFullDate = (date: string) => {
    const d = new Date(date);

    return d.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      month: "long",
      year: "numeric",
    });
  };

  const nextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const prevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const days = getDaysInMonth(currentMonth);

  const goToday = () => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    setCurrentMonth(today);
    setSelectedDate(todayString);
  };

  useEffect(() => {
    fetchInterviewSchedule().then(setInterview);
  }, []);

  const displayInterview = interview
    .filter((item) => item.date === selectedDate)
    .sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.time}`);
      const timeB = new Date(`1970-01-01T${b.time}`);
      return timeA.getTime() - timeB.getTime();
    });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.left}>
          <Pressable onPress={() => router.back()}>
            <Image
              source={require("../../../../assets/myApp/arrow.png")}
              style={styles.headerIcon}
            />
          </Pressable>
          <Text style={styles.title}>Lịch trình phỏng vấn</Text>
        </View>
      </View>

      {/* MONTH SELECT */}

      <View style={styles.monthContainer}>
        <Pressable onPress={prevMonth}>
          <Image
            source={require("../../../../assets/myApp/forward.png")}
            style={[styles.arrow, { transform: [{ scaleX: -1 }] }]}
          />
        </Pressable>
        <Text style={styles.monthText}>{formatMonth(currentMonth)}</Text>
        <Pressable onPress={nextMonth}>
          <Image
            source={require("../../../../assets/myApp/forward.png")}
            style={styles.arrow}
          />
        </Pressable>
        <View style={styles.monthCenter}>
          <Pressable style={styles.todayBtn} onPress={goToday}>
            <Text style={styles.todayText}>Hôm nay</Text>
          </Pressable>
        </View>
      </View>

      {/* DATE TAB */}
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        style={styles.dateContainer}
      >
        {days.map((date) => {
          const isSelected = date === selectedDate;

          return (
            <Pressable
              key={date}
              style={styles.dateItem}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[styles.dateText, isSelected && styles.dateActiveText]}
              >
                {formatFullDate(date)}
              </Text>

              {isSelected && <View style={styles.activeLine} />}
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView>
        {displayInterview.map((item, index) => (
          <View key={index} style={styles.contentContainer}>
            <Image
              source={{ uri: item.candidate.avatar }}
              style={styles.avata}
            />
            <View>
              <Text style={styles.time}>
                {item.time} - {item.post.position}
              </Text>
              <Text style={styles.name}>{item.candidate.name}</Text>
              {item.type === "ONLINE" && (
                <View style={{ marginLeft: 10, marginTop: 3 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../../../assets/myApp/maps-and-flags1.png")}
                      style={styles.icon}
                    />
                    <Text style={{ color: "#64748B" }}>
                      Phòng họp trực tuyến
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => {
                      if (item.link) {
                        Linking.openURL(item.link);
                      }
                    }}
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../../../assets/myApp/video.png")}
                      style={[styles.icon, { tintColor: "#64748B" }]}
                    />
                    <Text style={{ color: "#64748B" }}>{item.platform}</Text>
                  </Pressable>
                  <Text
                    style={{
                      color: "#3B82F6",
                      backgroundColor: "#EFF6FF",
                      width: 50,
                      paddingVertical: 2,
                      borderRadius: 5,
                      paddingHorizontal: 9,
                      marginTop: 3,
                      fontSize: 11,
                    }}
                  >
                    Online
                  </Text>
                </View>
              )}

              {item.type === "OFFLINE" && (
                <View style={{ marginLeft: 10, marginTop: 3 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../../../assets/myApp/maps-and-flags1.png")}
                      style={styles.icon}
                    />
                    <Text style={{ color: "#64748B" }}>{item.building}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../../../assets/myApp/place.png")}
                      style={styles.icon}
                    />
                    <Text style={{ color: "#64748B" }}>{item.room}</Text>
                  </View>

                  <Text
                    style={{
                      color: "#047857",
                      backgroundColor: "#D1FAE5",
                      width: 50,
                      paddingVertical: 2,
                      borderRadius: 5,
                      paddingHorizontal: 3,
                      marginTop: 3,
                      fontSize: 11,
                    }}
                  >
                    Trực tiếp
                  </Text>
                </View>
              )}
              {item.status === "UPCOMING" && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    alignItems: "center",
                    marginTop: 3,
                    marginLeft: 10,
                  }}
                >
                  <Image
                    source={require("../../../../assets/myApp/more.png")}
                    style={styles.icon}
                  />
                  <Text style={{ color: "#475569" }}>Sắp diễn ra</Text>
                </View>
              )}
              {item.status === "COMPLETED" && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    alignItems: "center",
                    marginTop: 3,
                    marginLeft: 10,
                  }}
                >
                  <Image
                    source={require("../../../../assets/myApp/checked.png")}
                    style={styles.icon}
                  />
                  <Text style={{ color: "#475569" }}>Hoành thành</Text>
                </View>
              )}
              {item.status === "CANCELLED" && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    alignItems: "center",
                    marginTop: 3,
                    marginLeft: 10,
                  }}
                >
                  <Image
                    source={require("../../../../assets/myApp/close1.png")}
                    style={styles.icon}
                  />
                  <Text style={{ color: "#475569" }}>Đã hủy</Text>
                </View>
              )}
            </View>
            <Pressable
              key={index}
              onPress={() => {
                setSelectedInterview(item);
                setVisible(true);
              }}
            >
              <Text>Xem</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <InterviewDetailModal
        visible={visible}
        data={selectedInterview}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  headerIcon: { width: 23, height: 23 },

  title: { fontSize: 20, fontWeight: "bold" },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  monthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },

  monthText: {
    fontSize: 16,
    fontWeight: "600",
  },

  arrow: {
    width: 18,
    height: 18,
    tintColor: "#000000",
  },

  dateContainer: {
    maxHeight: 27.5,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1.3,
  },

  dateItem: {
    marginRight: 20,
    alignItems: "center",
  },

  dateText: {
    fontSize: 14,
    color: "#64748B",
  },

  dateActiveText: {
    color: "#2563EB",
    fontWeight: "600",
  },

  activeLine: {
    marginTop: 5,
    width: "100%",
    height: 3,
    backgroundColor: "#2563EB",
    borderRadius: 2,
  },
  monthCenter: {
    alignItems: "center",
  },

  todayBtn: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#EFF6FF",
    borderRadius: 6,
  },

  todayText: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "600",
  },
  contentContainer: {
    borderColor: "#F1F5F9",
    borderWidth: 1.5,
    marginHorizontal: 14,
    paddingHorizontal: 5,
    paddingVertical: 4,
    marginTop: 7,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  avata: {
    width: 90,
    height: 90,
    borderRadius: 10,
    alignSelf: "center",
  },
  name: {
    fontSize: 16.5,
    fontWeight: "bold",
    marginTop: 3,
  },
  time: {
    fontSize: 13,
    color: "#64748B",
  },
  icon: {
    width: 13,
    height: 13,
  },
});
