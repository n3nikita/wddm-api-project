<?php
$contents = array(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
);

if (isset($_GET['q'])) {
    $search_query = $_GET['q'];
    $matching_contents = array();

    foreach ($contents as $content) {
        if (stripos($content, $search_query) !== false) {
            $matching_contents[] = $content;
        }
    }

    if (count($matching_contents) > 0) {
        echo "<ul>";
        foreach ($matching_contents as $content) {
            echo "<li>" . htmlspecialchars($content) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "No results found.";
    }
} else {
    echo "No search query provided.";
}
