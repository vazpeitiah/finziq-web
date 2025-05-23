import {
  ArrowLeft,
  CheckCircle,
  EditPencil,
  Label,
  Link,
  NavArrowDown,
  NavArrowLeft,
  NavArrowRight,
  NavArrowUp,
  Plus,
  Square,
  Trash,
  WarningCircle,
  XmarkCircleSolid
} from 'iconoir-react'

export enum Icons {
  Success,
  Warning,
  Error,
  Square,
  Link,
  Plus,
  Back,
  Edit,
  Remove,
  Label,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
}

interface IconComponentProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {}

const defaultIcon = Icons.Square

const MAP_ICONS: Record<Icons, (props: IconComponentProps) => React.ReactNode> =
  {
    [Icons.Success]: (props) => <CheckCircle {...props} />,
    [Icons.Warning]: (props) => <WarningCircle {...props} />,
    [Icons.Error]: (props) => <XmarkCircleSolid {...props} />,
    [Icons.Square]: (props) => <Square {...props} />,
    [Icons.Link]: (props) => <Link {...props} />,
    [Icons.Plus]: (props) => <Plus {...props} />,
    [Icons.Back]: (props) => <ArrowLeft {...props} />,
    [Icons.Edit]: (props) => <EditPencil {...props} />,
    [Icons.Remove]: (props) => <Trash {...props} />,
    [Icons.Label]: (props) => <Label {...props} />,
    [Icons.ArrowUp]: (props) => <NavArrowUp {...props} />,
    [Icons.ArrowDown]: (props) => <NavArrowDown {...props} />,
    [Icons.ArrowLeft]: (props) => <NavArrowLeft {...props} />,
    [Icons.ArrowRight]: (props) => <NavArrowRight {...props} />
  }

interface IconProps extends IconComponentProps {
  icon: Icons
  width?: number
  height?: number
}

const Icon = ({ icon, height = 24, width = 24, ...props }: IconProps) => {
  const iconExists = Object.values(Icons).includes(icon)
  const IconComponent = iconExists ? MAP_ICONS[icon] : MAP_ICONS[defaultIcon]
  return <IconComponent {...props} height={height} width={width} />
}

export default Icon
