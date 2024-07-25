# frozen_string_literal: true

atom_feed do |feed|
  feed.title("it's kai")
  if (entry = @entries.first)
    feed.updated(entry.created_at)
  end
  @entries.each do |e|
    feed.entry(e, url: root_url(entry_id: e.id)) do |entry|
      entry.title(e.title)
      entry.author do |author|
        author.name("kai")
      end
    end
  end
end
