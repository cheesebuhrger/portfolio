// Navigating to any other route closes the dialog: without this, a soft
// navigation would keep the @modal slot showing its last active state.
export default function CatchAll() {
  return null;
}
