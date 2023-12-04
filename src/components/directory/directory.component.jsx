import './directory.styles.scss';

const Directory = ({CategoryItem, categories}) => {
    return (
        <div className="categories-container">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      );
}

export default Directory;