import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f4f4f4",
      justifyContent: "space-between",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#333",
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      color: "#666",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderColor: "#ccc",
    },
    button: {
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
      marginTop: 5, // Espaço entre o ícone e o texto
    },
    icon: {
      width: 24,
      height: 24,
    },
});

export const new_project_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#ffa726",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14, // Um pouco menor que o texto de entrada
    color: "#555", // Cinza para contraste
    marginBottom: 4, // Espaço entre o label e o campo
    fontWeight: "500", // Peso médio para dar destaque
  },
});

export const user_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 5,
    elevation: 5, // sombra para imagem
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  statsBox: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0B5ED7",
    padding: 10,
    width: "45%",
    borderRadius: 8,
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statsLabel: {
    fontSize: 12,
    color: "#0B5ED7",
    marginTop: 5,
  },
  infoContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    color: "#0B5ED7",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: "#e6f7ff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#0B5ED7",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#0B5ED7",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const projects_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subHeader: {
    fontSize: 16,
    color: "#0B5ED7",
    marginBottom: 20,
  },
});

export const arquivated_projects_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subHeader: {
    fontSize: 16,
    color: "#0B5ED7",
    marginBottom: 20,
  },
});
const { width } = Dimensions.get("window");

export const report = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  status: {
    color: "#007bff",
    fontWeight: "bold",
  },
  descriptionBox: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  whiteBackground: {
    borderRadius: 0,
    shadowColor: 'transparent', 
    elevation: 0, 
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInputAnotações: {
    height: 120, 
    width: "90%", 
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top", 
  },
  photoList: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  photo: {
    width: width * 0.4, 
    height: width * 0.2, 
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    width: width * 0.4, 
    height: width * 0.2, 
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    color: "blue",
    fontWeight: "bold",
  },
  calendario:{
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.11,
    shadowRadius: 4,
  },
  calendarioHeader:{
    borderBottomWidth: 0.5,
    paddingBottom: 0, 
    marginBottom: 14,
  },
  calendarioBody:{

  },
});
