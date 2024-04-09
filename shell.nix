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
    ++ pkgs.lib.optionals pkgs.stdenv.isLinux [ pkgs.inotify-tools ]
    ++ pkgs.lib.optionals pkgs.stdenv.isDarwin (with pkgs.darwin.apple_sdk.frameworks; [
        CoreFoundation
        CoreServices
      ]);

in pkgs.mkShell {
  buildInputs = inputs;
}
