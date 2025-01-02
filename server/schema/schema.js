const { packs } = require("../sampleData.js");

//Mongoose Models
const Pack = require('../models/Pack')

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLBoolean,
  GraphQLList, 
  GraphQLNonNull, 
  GraphQLSchema 
} = require('graphql');

const WhiteCardType = new GraphQLObjectType({
  name: 'WhiteCard',
  fields: () => ({
    text: { type: GraphQLNonNull(GraphQLString) },
    pack: { type: GraphQLNonNull(GraphQLInt) }
  })
});

const BlackCardType = new GraphQLObjectType({
  name: 'BlackCard',
  fields: () => ({
    text: { type: GraphQLNonNull(GraphQLString) },
    pack: { type: GraphQLNonNull(GraphQLInt) },
    pick: { type: GraphQLNonNull(GraphQLInt) }
  })
});

const PackType = new GraphQLObjectType({
  name: 'Pack',
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    white: { type: GraphQLNonNull(new GraphQLList(new GraphQLNonNull(WhiteCardType))) },
    black: { type: GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BlackCardType))) },
    official: { type: GraphQLNonNull(GraphQLBoolean) }
  })
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
        return Pack.findOne({name: args.name});
      },
    }, 
    pack: {
      type: PackType,
      args: { packId: { type: GraphQLInt } },
      resolve(parent, args) {
        return Pack.findOne({"white.pack": args.packId});
      },
    }, 
  },
});

//Mutations
// const mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     //Add A Client
//     addClient: {
//       type: ClientType,
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) },
//         email: { type: GraphQLNonNull(GraphQLString) },
//         phone: { type: GraphQLNonNull(GraphQLString) },
//       },
//       resolve(parent, args) {
//         const client = new Client({
//           name: args.name,
//           email: args.email,
//           phone: args.phone,
//         });

//         return client.save();
//       },
//     },
//     //Delete A Client
//     deleteClient: {
//       type: ClientType,
//       args: {
//         id: { type: GraphQLNonNull(GraphQLID) },
//       },
//       async resolve(parent, args) {
//         await Project.find({ clientId: args.id }).then(async (projects) => {
//           for (let i = 0; i < projects.length; i++) {
//             const project = projects[i];
//             await Project.findByIdAndDelete(project.id);
//           }
//         });
//         await Client.findByIdAndDelete(args.id);
//       },
//     },
//     //Add A Project
//     addProject: {
//       type: ProjectType,
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) },
//         description: { type: GraphQLNonNull(GraphQLString) },
//         status: {
//           type: GraphQLEnumType({
//             name: "ProjectStatus",
//             values: {
//               new: { value: "Not Started" },
//               progress: { value: "In Progress" },
//               completed: { value: "Completed" },
//             },
//           }),
//           defaultValue: "Not Started",
//         },
//         clientId: { type: GraphQLNonNull(GraphQLID) },
//       },
//       resolve(parent, args) {
//         const project = new Project({
//           name: args.name,
//           description: args.description,
//           status: args.status,
//           clientId: args.clientId,
//         });

//         return project.save();
//       },
//     },
//     // Delete Project
//     deleteProject: {
//       type: ProjectType,
//       args: {
//         id: { type: GraphQLNonNull(GraphQLID) },
//       },
//       resolve(parent, args) {
//         return Project.findByIdAndDelete(args.id);
//       },
//     },
//     // Update Project
//     updateProject: {
//       type: ProjectType,
//       args: {
//         id: { type: GraphQLNonNull(GraphQLID) },
//         name: { type: GraphQLString },
//         description: { type: GraphQLString },
//         status: {
//           type: GraphQLEnumType({
//             name: "ProjectStatusUpdate",
//             values: {
//               new: { value: "Not Started" },
//               progress: { value: "In Progress" },
//               completed: { value: "Completed" },
//             },
//           }),
//         },
//       },
//       resolve(parent, args) {
//         return Project.findByIdAndUpdate(
//           args.id,
//           {
//             $set: {
//               name: args.name,
//               description: args.description,
//               status: args.status,
//             },
//           },
//           { new: true },
//         );
//       },
//     },
//   },
// });

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation,
});
