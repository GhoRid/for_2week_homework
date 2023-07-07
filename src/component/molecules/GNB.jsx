import Container from "../atoms/Container";
import Button from "../atoms/Button";
import Box from "../atoms/Box";
import Link from '../atoms/Link';
import Title from '../atoms/Title';
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../store/slices/loginSlice";
import "../../styles/molecules/GNB.css";

const GNB = ({ children }) => {

    const dispatch = useDispatch();
    const loginState = useSelector(state => state.login.loginState);
    // const email = useSelector(state => state.user.email);

    const logOut =() => {
        dispatch(setLogout({ //로그아웃
        login: false,
      }));
    }

    if (loginState) {
    return <Container className={"gnb"}>
      <Box className={"gnb"}>
      <Title className= {"gnb"}>{children}</Title>
      <div className = "buttoncover">
      <Button onClick={logOut} disabled={false} className={"gnb"}>로그아웃</Button></div>
    </Box>
    </Container>
    }
    return <Container className={"gnb"}>
    <Box className= {"gnb"}>
      <Title className= {"gnb"}>{children}</Title>
      <div className = "buttoncover">
      <Link href={"/login"} className= {"gnb"}>로그인</Link></div>
    </Box>
</Container>
};

export default GNB;


