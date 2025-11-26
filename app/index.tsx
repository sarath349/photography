import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

type TemplateItem = {
  id: string;
  image: string;
  category: string;
};

const suggestedTemplates: TemplateItem[] = [
  { id: "1", image: "https://picsum.photos/seed/1/300/400", category: "Photography" },
  { id: "2", image: "https://picsum.photos/seed/2/300/400", category: "Photography" },
  { id: "3", image: "https://picsum.photos/seed/3/300/400", category: "Photography" },
  { id: "4", image: "https://picsum.photos/seed/4/300/400", category: "Photography" },
  { id: "5", image: "https://picsum.photos/seed/5/300/400", category: "Photography" },
  { id: "6", image: "https://picsum.photos/seed/6/300/400", category: "Photography" },
];

const monochromeTemplates: TemplateItem[] = [
  { id: "7", image: "https://picsum.photos/seed/7/300/400", category: "Monochrome" },
  { id: "8", image: "https://picsum.photos/seed/8/300/400", category: "Monochrome" },
  { id: "9", image: "https://picsum.photos/seed/9/300/400", category: "Monochrome" },
  { id: "10", image: "https://picsum.photos/seed/10/300/400", category: "Monochrome" },
  { id: "11", image: "https://picsum.photos/seed/11/300/400", category: "Monochrome" },
  { id: "12", image: "https://picsum.photos/seed/12/300/400", category: "Monochrome" },
];

const TABS = [
  { id: "home", label: "Home", icon: "home-outline" as const },
  { id: "videos", label: "Videos", icon: "videocam-outline" as const },
  { id: "photography", label: "Photography", icon: "aperture-outline" as const },
  { id: "inaction", label: "In action", icon: "play-circle-outline" as const },
  { id: "commercial", label: "Commercial", icon: "pricetag-outline" as const },
  { id: "arads", label: "AR Ads", icon: "cube-outline" as const },
];

export default function Index() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [activeTabId, setActiveTabId] = useState<string>("photography");

  const renderTemplateItem = ({ item }: { item: TemplateItem }) => {
    const isSelected = item.id === selectedTemplateId;

    return (
      <Pressable
        onPress={() => setSelectedTemplateId(item.id)}
        style={({ pressed }) => [
          styles.templateItem,
          isSelected && styles.templateItemSelected,
          pressed && styles.templateItemPressed,
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.templateImage} />
        {isSelected && (
          <View style={styles.tickContainer}>
            <View style={styles.tickCircle}>
              <Ionicons name="checkmark" size={16} color="#0B1410" />
            </View>
          </View>
        )}
      </Pressable>
    );
  };

  const renderTab = (tabId: string, label: string, icon: keyof typeof Ionicons.glyphMap) => {
    const isActive = tabId === activeTabId;
    return (
      <Pressable
        key={tabId}
        onPress={() => setActiveTabId(tabId)}
        style={({ pressed }) => [
          styles.tabItem,
          isActive && styles.tabItemActive,
          pressed && styles.tabItemPressed,
        ]}
      >
        <Ionicons
          name={icon}
          size={18}
          color={isActive ? "#00FF85" : "#9EA4B4"}
          style={styles.tabIcon}
        />
        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>Photography</Text>
          <View style={styles.profileCircle}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=3" }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {TABS.map((tab) => renderTab(tab.id, tab.label, tab.icon))}
        </ScrollView>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#737A8C" style={styles.searchIcon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for keyword 'flowers'..."
            placeholderTextColor="#737A8C"
            style={styles.searchInput}
          />
        </View>

        {/* Prompt input */}
        <View style={styles.promptContainer}>
          <TextInput
            value={prompt}
            onChangeText={setPrompt}
            placeholder="Describe the scene around your product..."
            placeholderTextColor="#737A8C"
            multiline
            style={styles.promptInput}
          />
          <Pressable style={styles.promptActionButton}>
            <Ionicons name="sparkles-outline" size={18} color="#050608" />
          </Pressable>
        </View>

        {/* Suggested templates */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Or try suggested templates</Text>
        </View>
        <FlatList
          data={suggestedTemplates}
          keyExtractor={(item) => item.id}
          renderItem={renderTemplateItem}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.gridContentContainer}
        />

        {/* Monochrome section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monochrome</Text>
        </View>
        <FlatList
          data={monochromeTemplates}
          keyExtractor={(item) => item.id}
          renderItem={renderTemplateItem}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={[styles.gridContentContainer, styles.bottomGridSpacing]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050608",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2A2F3B",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2A2F3B",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  tabsRow: {
    paddingVertical: 4,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "transparent",
  },
  tabItemActive: {
    backgroundColor: "#1A2420",
  },
  tabItemPressed: {
    opacity: 0.7,
  },
  tabIcon: {
    marginRight: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: "#9EA4B4",
  },
  tabLabelActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#11141E",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },
  promptContainer: {
    backgroundColor: "#11141E",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
    marginBottom: 24,
    position: "relative",
  },
  promptInput: {
    color: "#FFFFFF",
    fontSize: 14,
    minHeight: 80,
    paddingRight: 40,
  },
  promptActionButton: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#00FF85",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  gridContentContainer: {
    paddingBottom: 8,
  },
  bottomGridSpacing: {
    paddingBottom: 0,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  templateItem: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1A1F2A",
  },
  templateItemSelected: {
    borderWidth: 2,
    borderColor: "#00FF85",
  },
  templateItemPressed: {
    opacity: 0.85,
  },
  templateImage: {
    width: 100,
    height: 130,
  },
  tickContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  tickCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#00FF85",
    alignItems: "center",
    justifyContent: "center",
  },
});

