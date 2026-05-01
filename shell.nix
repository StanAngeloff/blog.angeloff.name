{
  pkgs ? import <nixpkgs> { },
}:
let
  nodejs_lts = pkgs.nodejs_24;
in
pkgs.mkShell {
  name = "blog-dev-shell";

  buildInputs = with pkgs; [
    nodejs_lts
    nodejs_lts.pkgs.pnpm
    nixfmt-rfc-style
    nodejs_lts.pkgs.prettier
    taplo
    treefmt
  ];
}
