import Button from "../../components/common/Button";

const Example = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button loading>Publishing...</Button>

      <Button disabled variant="outline">
        Unavailable
      </Button>

      <Button fullWidth>Subscribe to Newsletter</Button>
    </div>
  );
};

export default Example;
