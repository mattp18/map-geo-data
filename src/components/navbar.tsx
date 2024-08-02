import { NavLink } from "@mantine/core";

export default function NavBar() {
  return (
    <div>
      <NavLink
        href="#required-for-focus"
        label="With icon"
        leftSection={<h2>testing</h2>}
      />
    </div>
  );
}
