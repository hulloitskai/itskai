# frozen_string_literal: true

atom_feed do |feed|
  feed.title("it's kai")
  if (entry = @entries.first)
    feed.updated(entry.created_at)
  end
  @entries.each do |item|
    feed.entry(
      item,
      url: root_url(entry_id: item.id),
      updated: item.last_edited_at,
    ) do |entry|
      entry.title(item.title)
      entry.author do |author|
        author.name("kai")
      end
    end
  end
end
