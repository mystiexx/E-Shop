import { List, ListItem } from "@chakra-ui/react";

const Categories = ({ categories, fetchCategory }) => {
    if (!categories) return "loading...";
    return (
        <List spacing={3}>
            {categories.map((data) => (
                <ListItem key={data.id} onClick={(e) => fetchCategory(data.id)}>
                    {data.name}
                </ListItem>
            ))}
        </List>
    );
};

export default Categories;
