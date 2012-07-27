STYLES_PATH := assets/styles/

.PHONY: default start-jekyll-server start watch-default-styles watch compile-default-styles compile compass-command install-ruby-gem-bundle install

default:
	@echo "No default $(MAKE) target configured."
	@exit 1

start-jekyll-server:
	@bin/jekyll --auto --server

start: start-jekyll-server

watch-default-styles:
	@$(MAKE) --no-print-directory compass-command ARGS='watch'

watch: watch-default-styles

compile-default-styles:
	@$(MAKE) --no-print-directory compass-command ARGS='compile --force'

compile: compile-default-styles

compass-command:
	@( cd '$(STYLES_PATH)' && compass $(ARGS) )

install-ruby-gem-bundle:
	@echo -n 'Installing RubyGem dependencies... '
	@bundle install --path '$(CURDIR)/vendor' --binstubs '$(CURDIR)/bin'
	@echo 'OK'

install: install-ruby-gem-bundle


# vim: ts=2 sw=2 noet
