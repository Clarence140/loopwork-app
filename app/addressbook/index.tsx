/**
 * ========================================
 * ADDRESS BOOK - MAIN SCREEN
 * ========================================
 *
 * Company contact directory
 */

import AppHeader from "@/components/app-header";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddContactModal from "./components/AddContactModal";
import ContactDetailsModal from "./components/ContactDetailsModal";
import ContactItem from "./components/ContactItem";
import { mockContacts } from "./mockData";
import { Contact, CONTACT_CATEGORIES } from "./types";

export default function AddressBookScreen() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  // Filter contacts
  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (contact) => contact.category === categoryFilter
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.company?.toLowerCase().includes(query) ||
          contact.email?.toLowerCase().includes(query) ||
          contact.mobilePhone?.includes(query) ||
          contact.telephone?.includes(query) ||
          contact.jobTitle?.toLowerCase().includes(query)
      );
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts, searchQuery, categoryFilter]);

  // Create new contact
  const handleCreateContact = (data: any) => {
    const newContact: Contact = {
      id: `contact_${Date.now()}`,
      ...data,
      createdBy: "emp_001",
      companyCode: "DEMO",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setContacts([...contacts, newContact]);
  };

  // Update contact
  const handleUpdateContact = (data: any) => {
    if (!selectedContact) return;

    setContacts(
      contacts.map((contact) =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              ...data,
              updatedAt: new Date(),
            }
          : contact
      )
    );
    setShowDetailsModal(false);
    setSelectedContact(null);
  };

  // View contact details
  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetailsModal(true);
  };

  // Edit contact
  const handleEditContact = (contact: Contact) => {
    setShowDetailsModal(false);
    setSelectedContact(contact);
    setShowAddModal(true);
  };

  // Delete contact
  const handleDeleteContact = (contact: Contact) => {
    setShowDetailsModal(false);
    setContactToDelete(contact);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      setContacts(contacts.filter((c) => c.id !== contactToDelete.id));
    }
    setShowDeleteConfirm(false);
    setContactToDelete(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppHeader
        title="Address Book"
        subtitle={`${filteredContacts.length} contact${
          filteredContacts.length !== 1 ? "s" : ""
        }`}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search contacts..."
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilterContainer}
        contentContainerStyle={styles.categoryFilterContent}
      >
        <TouchableOpacity
          onPress={() => setCategoryFilter("All")}
          style={[
            styles.filterChip,
            categoryFilter === "All" && styles.filterChipActive,
          ]}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterChipText,
              categoryFilter === "All" && styles.filterChipTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {CONTACT_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            onPress={() => setCategoryFilter(cat.value)}
            style={[
              styles.filterChip,
              categoryFilter === cat.value && {
                backgroundColor: cat.color + "20",
                borderColor: cat.color,
              },
            ]}
            activeOpacity={0.7}
          >
            <Ionicons
              name={cat.icon as any}
              size={14}
              color={categoryFilter === cat.value ? cat.color : "#6B7280"}
            />
            <Text
              style={[
                styles.filterChipText,
                categoryFilter === cat.value && {
                  color: cat.color,
                  fontWeight: "600",
                },
              ]}
            >
              {cat.value}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Contacts List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {filteredContacts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>
              {searchQuery ? "No contacts found" : "No contacts yet"}
            </Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "Try a different search term"
                : "Tap the + button to add your first contact"}
            </Text>
          </View>
        ) : (
          filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onPress={handleViewContact}
            />
          ))
        )}
      </ScrollView>

      {/* FAB - Add Contact */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setSelectedContact(null);
          setShowAddModal(true);
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add/Edit Contact Modal */}
      <AddContactModal
        visible={showAddModal}
        contact={selectedContact}
        onClose={() => {
          setShowAddModal(false);
          setSelectedContact(null);
        }}
        onSave={selectedContact ? handleUpdateContact : handleCreateContact}
      />

      {/* Contact Details Modal */}
      <ContactDetailsModal
        visible={showDetailsModal}
        contact={selectedContact}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedContact(null);
        }}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.deleteModal}>
            <View style={styles.deleteIconWrapper}>
              <Ionicons name="trash" size={32} color="#EF4444" />
            </View>
            <Text style={styles.deleteTitle}>Delete Contact?</Text>
            <Text style={styles.deleteMessage}>
              Are you sure you want to delete{"\n"}
              <Text style={styles.deleteContactName}>
                "{contactToDelete?.name}"
              </Text>
              ?
            </Text>
            <Text style={styles.deleteWarning}>
              This action cannot be undone.
            </Text>
            <View style={styles.deleteButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDeleteConfirm(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmDelete}
                activeOpacity={0.7}
              >
                <Ionicons name="trash" size={18} color="#FFFFFF" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  categoryFilterContainer: {
    maxHeight: 50,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  categoryFilterContent: {
    gap: 8,
    paddingRight: 16,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  filterChipActive: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A",
  },
  filterChipText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  deleteModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  deleteIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  deleteTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  deleteMessage: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 22,
  },
  deleteContactName: {
    fontWeight: "600",
    color: "#111827",
  },
  deleteWarning: {
    fontSize: 13,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 24,
  },
  deleteButtonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
