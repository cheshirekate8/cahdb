const { packs } = require("../sampleData.js");
const mongoose = require("mongoose");


//Mongoose Models
const Pack = require("../models/Pack");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType
} = require("graphql");

const WhiteCardType = new GraphQLObjectType({
  name: "WhiteCard",
  fields: () => ({
    text: { type: GraphQLNonNull(GraphQLString) },
    pack: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const BlackCardType = new GraphQLObjectType({
  name: "BlackCard",
  fields: () => ({
    text: { type: GraphQLNonNull(GraphQLString) },
    pack: { type: GraphQLNonNull(GraphQLInt) },
    pick: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const PackType = new GraphQLObjectType({
  name: "Pack",
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    white: {
      type: GraphQLNonNull(new GraphQLList(new GraphQLNonNull(WhiteCardType))),
    },
    black: {
      type: GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BlackCardType))),
    },
    official: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
});

const WhiteCardInput = new GraphQLInputObjectType({
  name: "WhiteCardInput",
  fields: {
    text: { type: GraphQLNonNull(GraphQLString) },
    pack: { type: GraphQLNonNull(GraphQLInt) },
  }
});

const BlackCardInput = new GraphQLInputObjectType({
  name: "BlackCardInput",
  fields: {
    text: { type: GraphQLNonNull(GraphQLString) },
    pack: { type: GraphQLNonNull(GraphQLInt) },
    pick: { type: GraphQLNonNull(GraphQLInt) },
  }
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    packs: {
      type: GraphQLList(PackType),
      resolve(parent, args) {
        return Pack.find();
      },
    },
    packByName: {
      type: PackType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args) {
        return Pack.findOne({ name: args.name });
      },
    },
    pack: {
      type: PackType,
      args: { packId: { type: GraphQLInt } },
      resolve(parent, args) {
        return Pack.findOne({ "white.pack": args.packId });
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //Add A Pack
    addPack: {
      type: PackType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        white: {
          type: (GraphQLNonNull(new GraphQLList(WhiteCardInput))),
        },
        black: {
          type: GraphQLNonNull(new GraphQLList(BlackCardInput)),
        },
      },
      resolve(parent, args) {
        const newPack = new Pack({
          name: args.name,
          white: args.white,
          black: args.black,
          official: false,
        });


        return newPack.save();
      },
    },
    // Delete Pack
    deletePack: {
      type: PackType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Pack.findOneAndDelete({name: args.name});
      },
    },
    // // Update Project
    // updateProject: {
    //   type: ProjectType,
    //   args: {
    //     id: { type: GraphQLNonNull(GraphQLID) },
    //     name: { type: GraphQLString },
    //     description: { type: GraphQLString },
    //     status: {
    //       type: GraphQLEnumType({
    //         name: "ProjectStatusUpdate",
    //         values: {
    //           new: { value: "Not Started" },
    //           progress: { value: "In Progress" },
    //           completed: { value: "Completed" },
    //         },
    //       }),
    //     },
    //   },
    //   resolve(parent, args) {
    //     return Project.findByIdAndUpdate(
    //       args.id,
    //       {
    //         $set: {
    //           name: args.name,
    //           description: args.description,
    //           status: args.status,
    //         },
    //       },
    //       { new: true },
    //     );
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
