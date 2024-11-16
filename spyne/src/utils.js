/** @format */

import { Eye } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { Pencil } from "lucide-react";

export const Menus = [
  {
    name: "Features",
    subMenu: [
      {
        name: "Create",
        desc: "Create a car",
        icon: Plus,
      },
      {
        name: "View",
        desc: "View a car",
        icon: Eye,
      },
      {
        name: "Edit",
        desc: "Edit a car",
        icon: Pencil,
      },
      {
        name: "Delete",
        desc: "Delete a car",
        icon: Trash,
      },
    ],
    gridCols: 2,
  },

  {
    name: "Support",
    subMenu: [
      {
        name: "Help",
        desc: "Center",
        icon: CircleHelp,
      },
    ],
    gridCols: 1,
  },
];
