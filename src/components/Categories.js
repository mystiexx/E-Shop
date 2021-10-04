import { List, ListItem } from "@chakra-ui/react";
import { useHistory } from "react-router";

const Categories = ({ categories }) => {
    let history = useHistory();
  
   

    return (
        <List spacing={3}>
            {categories.map((data) => (
                <ListItem
                    key={data.id}
                    onClick={(e) => history.push(`/category/${data.id}`)}
                    _hover={{ cursor: "pointer", bg: "white" }}
                >
                    {data.name}
                </ListItem>
            ))}
        </List>
    );
};

export default Categories;
