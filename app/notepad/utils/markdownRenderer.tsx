/**
 * ========================================
 * SIMPLE MARKDOWN RENDERER
 * ========================================
 *
 * Renders basic markdown for mobile display
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const renderMarkdown = (text: string) => {
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];

  lines.forEach((line, index) => {
    // Bold: **text** or __text__
    const boldRegex = /\*\*(.*?)\*\*|__(.*?)__/g;
    // Italic: *text* or _text_
    const italicRegex = /\*(.*?)\*|_(.*?)_/g;
    // Bullet: • or -
    const bulletRegex = /^[•\-]\s(.+)/;

    if (line.trim() === "") {
      elements.push(<View key={index} style={styles.lineBreak} />);
    } else if (bulletRegex.test(line)) {
      // Bullet list item
      const match = line.match(bulletRegex);
      if (match) {
        elements.push(
          <View key={index} style={styles.bulletItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{formatInlineText(match[1])}</Text>
          </View>
        );
      }
    } else {
      // Regular line with possible inline formatting
      elements.push(
        <Text key={index} style={styles.line}>
          {formatInlineText(line)}
        </Text>
      );
    }
  });

  return <View>{elements}</View>;
};

const formatInlineText = (text: string) => {
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  // Match **bold** and *italic*
  const regex = /\*\*(.*?)\*\*|\*(.*?)\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add formatted text
    if (match[1]) {
      // Bold
      parts.push(
        <Text key={match.index} style={styles.bold}>
          {match[1]}
        </Text>
      );
    } else if (match[2]) {
      // Italic
      parts.push(
        <Text key={match.index} style={styles.italic}>
          {match[2]}
        </Text>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const styles = StyleSheet.create({
  line: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 4,
  },
  lineBreak: {
    height: 8,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 15,
    color: "#374151",
    marginRight: 8,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "700",
  },
  italic: {
    fontStyle: "italic",
  },
});
