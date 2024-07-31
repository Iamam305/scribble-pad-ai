export function extract_string_between_tags(
  str: string,
  tag: string
) {
  // Create a regular expression to match the content between the given tags
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');

  // Use the regular expression to find the content
  const match = str.match(regex);

  // If a match is found, return the content, otherwise return null
  return match ? match[1].trim() : null;
}


