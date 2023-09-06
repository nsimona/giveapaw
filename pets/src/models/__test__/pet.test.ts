import { petMock } from "../../test/helper";
import { Pet } from "../pet";

it("implements OCC", async () => {
  // Create an instance of a pet
  const pet = Pet.build(petMock);

  // Save the pet to the database
  await pet.save();

  // fetch the pet twice
  const firstInstance = await Pet.findById(pet.id);
  const secondInstance = await Pet.findById(pet.id);

  // make two separate changes to the pets we fetched
  firstInstance!.set({ age: 10 });
  secondInstance!.set({ age: 15 });

  // save the first fetched pet
  await firstInstance!.save();

  // save the second fetched pet and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const pet = Pet.build(petMock);

  await pet.save();
  expect(pet.version).toEqual(0);
  await pet.save();
  expect(pet.version).toEqual(1);
  await pet.save();
  expect(pet.version).toEqual(2);
});
