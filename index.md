---
layout: default
---

<ol class="unstyled long">
{% for post in site.posts %}
  <li><a href="{{ post.url | xml_escape }}">{{ post.title | xml_escape }}</a> <small>({{ post.date | date: "%B %e, %Y" | xml_escape }})</small></li>
{% endfor %}
</ol>
