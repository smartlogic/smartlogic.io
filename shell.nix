{
  lib ? import <lib> {},
  pkgs ? import <nixpkgs> {}
}:

let

  # define packages to install with special handling for OSX
  basePackages = [
    pkgs.ruby_3_3
    pkgs.git
    pkgs.gh
    pkgs.ripgrep
  ];

  inputs = basePackages
    ++ [ pkgs.bashInteractive ]
    ++ pkgs.lib.optionals pkgs.stdenv.isLinux [ pkgs.inotify-tools ];

in pkgs.mkShell {
  name = "SmartLogic.io";
  buildInputs = inputs;
}
