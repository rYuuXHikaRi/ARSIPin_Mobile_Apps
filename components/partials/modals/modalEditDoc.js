import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

export default function ModalEditDoc({ isVisible, children }) {
    return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
          {children}
    </Modal>
    );
  }