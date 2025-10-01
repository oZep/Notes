---
layout: default
title: All Books
permalink: /books/
---

# All Book Notes

Browse all my book notes below:

<ul class="book-list">
{% for book in site.books %}
  <li>
    <a href="{{ book.url | relative_url }}">{{ book.title }}</a>
    {% if book.author %}
    <p class="author">by {{ book.author }}</p>
    {% endif %}
    {% if book.date %}
    <p class="date">Notes from {{ book.date | date: "%B %Y" }}</p>
    {% endif %}
  </li>
{% endfor %}
</ul>
