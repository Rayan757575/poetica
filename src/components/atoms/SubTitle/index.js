import { CustomSubTitle } from "./styles";


export const SubTitle = ({children, ...props}) => {
    return(
        <CustomSubTitle {...props}>{children}</CustomSubTitle>
    )
}