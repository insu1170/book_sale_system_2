// utils/useNavigation.js
import {useNavigate} from 'react-router-dom';

const useNavigation = (path, option) => {
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate(path, {state: option});
    };

    return navigateTo;
};

export default useNavigation;
