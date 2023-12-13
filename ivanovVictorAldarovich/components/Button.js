import { Pressable, StyleSheet, Text } from "react-native";

const Button = (props) => {
  const { onPress, title = "Title", variant = "primary" } = props;

  switch (variant) {
    case "primary":
      return (
        <Pressable
          style={{ ...styles.buttonPrimary, ...styles.button }}
          onPress={onPress}
        >
          <Text style={{ ...styles.textPrimary, ...styles.text }}>{title}</Text>
        </Pressable>
      );
    case "secondary":
      return (
        <Pressable
          style={{ ...styles.buttonSecondary, ...styles.button }}
          onPress={onPress}
        >
          <Text style={{ ...styles.textSecondary, ...styles.text }}>
            {title}
          </Text>
        </Pressable>
      );
    case "delete":
      return (
        <Pressable
          style={{ ...styles.buttonDelete, ...styles.button }}
          onPress={onPress}
        >
          <Text style={{ ...styles.textDelete, ...styles.text }}>{title}</Text>
        </Pressable>
      );
    default:
      return (
        <Pressable
          style={{ ...styles.buttonPrimary, ...styles.button }}
          onPress={onPress}
        >
          <Text style={{ ...styles.textPrimary, ...styles.text }}>{title}</Text>
        </Pressable>
      );
  }
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    display: "flex",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
  },
  buttonSecondary: {
    backgroundColor: "#007AFF15",
  },
  buttonDelete: {
    background: "none",
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
  },
  textPrimary: {
    color: "#fff",
  },
  textSecondary: {
    color: "#007AFF",
  },
  textDelete: {
    color: "#FF0000",
  },
});

export default Button;
