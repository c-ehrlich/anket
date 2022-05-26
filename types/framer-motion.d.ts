import * as React from "react"

// TODO remove this file once this issue is resolved
// https://github.com/framer/motion/issues/1509

declare module "framer-motion" {
  export interface AnimatePresenceProps {
    children?: React.ReactNode
  }
}
