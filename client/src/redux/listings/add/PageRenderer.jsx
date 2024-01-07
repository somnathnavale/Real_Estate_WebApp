import CommonListingsDetails from './CommonListingsDetails';
import SecondaryListingsDetails from './SecondaryListingsDetails';
import AddressListingsDetails from './AddressListingsDetails';
import ListingsPhotosDetails from './ListingsPhotosDetails';

const PageRenderer = ({page, ...props}) => {
    switch (page) {
      case 1:
        return (
          <CommonListingsDetails
            propertyData={props.propertyData}
            handleChange={props.handleChange}
          />
        );
      case 2:
        return (
          <SecondaryListingsDetails
            propertyData={props.propertyData}
            handleChange={props.handleChange}
          />
        );
      case 3:
        return (
          <AddressListingsDetails
            propertyData={props.propertyData}
            handleChange={props.handleChange}
          />
        );
      case 4:
        return <ListingsPhotosDetails {...props} />;
      default:
        return <></>;
    }
}

export default PageRenderer