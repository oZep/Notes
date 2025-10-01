---
layout: default
title: Home
---

# Welcome to My Book Notes

This is a collection of notes from books I've been reading. Each book has its own dedicated page with key insights, quotes, and reflections.

## Recent Book Notes

<ul class="book-list">
{% for book in site.books %}
  <li>
    <a href="{{ book.url | relative_url }}">{{ book.title }}</a>
    {% if book.author %}
    <p class="author">by {{ book.author }}</p>
    {% endif %}
  </li>
{% endfor %}
</ul>

{% if site.books.size == 0 %}
<p>No book notes yet. Check back soon!</p>
{% endif %}
