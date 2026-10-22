import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";

/* ================================================================
   1) IMAGENS
   ================================================================ */
const IMAGENS = {
  item1:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoralmemorial.com%2Fwp-content%2Fuploads%2F2023%2F02%2FCRISTO-1.jpg&f=1&nofb=1&ipt=aeb353d4a0b2e5a5842ed89baad02bbd5f053f6be32fa67a4d6f88cf7e8e7762&ipo=images",
  item2:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.destino.foz.br%2Fwp-content%2Fuploads%2F2022%2F07%2FCataratas-001-1600x1200-1.jpg&f=1&nofb=1&ipt=22ae26dec7bdc65aa47fbd1d3c5eead1a638dd1e10830158ba047d848ff53d4e&ipo=images",
  item3:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftourb.com.br%2Fimg%2Flugares%2Fsalvador%2Fpelourinho.jpg&f=1&nofb=1&ipt=72592f9060fb404c82cb833fbb6e12987533907b95bf139e3805d1d0b92203ef&ipo=images",
  item4:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffocoturismo.com.br%2Fdicas%2Fwp-content%2Fuploads%2F2019%2F08%2Fnoronha.jpg&f=1&nofb=1&ipt=a13e68576e7510243a33c6891115718f16ebfa9be9558600931680fe93e01b4f&ipo=images",
  item5:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.greenpeace.org%2Fstatic%2Fplanet4-brasil-stateless%2F2024%2F05%2F5b07ea98-floresta-amazonica-1024x682.jpg&f=1&nofb=1&ipt=f7d74471f56ba107ef8d67729ca579e9dcd8e901729d5d86fda018b55f269a33&ipo=images",
  detalhe1:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.getyourguide.com%2Fimg%2Ftour%2F64b6913b1e4db.jpeg%2F145.jpg&f=1&nofb=1&ipt=920f2407f3c866a7cb544566bd2d7c5afaba7faff4b0a910313984297b9ad627&ipo=images",
  detalhe2:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.destino.foz.br%2Fwp-content%2Fuploads%2F2022%2F07%2FCataratas-001-1600x1200-1.jpg&f=1&nofb=1&ipt=22ae26dec7bdc65aa47fbd1d3c5eead1a638dd1e10830158ba047d848ff53d4e&ipo=images",
  detalhe3:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.fotocommunity.com%2Fpelourinho-6e44e7f0-2646-4b11-8837-2a20802ce809.jpg%3Fheight%3D1080&f=1&nofb=1&ipt=4927e0333dc734d79b061e7ec8727b48691a4943c89906486ade0328c4ba06b8&ipo=images",
  detalhe4:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.guiadoturismobrasil.com%2Fup%2Fimg%2F1761916786.jpg&f=1&nofb=1&ipt=99f29efce1ab8cc83e81fc00269dcd3af991ebd68bb567e3e89caef85aea1ebf&ipo=images",
  detalhe5:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F06%2F70%2F52%2F067052c13215e52ca1c6be55eebe87bd.png%3Fnii%3Dt&f=1&nofb=1&ipt=30bf2e2b7acaf9faa9e239b15a5f3fe295ec51b693820679a1c058f76a3b8d6a&ipo=images",
};

/* ================================================================
   2) DADOS
   ================================================================ */
const DADOS = [
  {
    id: "1",
    titulo: "Cristo Redentor",
    local: "Rio de Janeiro - RJ",
    imagem: IMAGENS.item1,
    imagemDetalhe: IMAGENS.detalhe1,
    descricaoCurta:
      "Um dos monumentos mais famosos do mundo, no topo do Morro do Corcovado.",
    descricaoLonga:
      "O Cristo Redentor é um dos monumentos mais famosos do mundo e está localizado no topo do Morro do Corcovado, no Rio de Janeiro. Inaugurado em 1931, o monumento possui 38 metros de altura e oferece uma vista panorâmica impressionante da cidade, sendo considerado uma das Sete Maravilhas do Mundo Moderno.",
  },
  {
    id: "2",
    titulo: "Cataratas do Iguaçu",
    local: "Foz do Iguaçu - PR",
    imagem: IMAGENS.item2,
    imagemDetalhe: IMAGENS.detalhe2,
    descricaoCurta:
      "Quedas d’água gigantescas na fronteira entre Brasil e Argentina.",
    descricaoLonga:
      "As Cataratas do Iguaçu estão localizadas na fronteira entre o Brasil e a Argentina, no estado do Paraná. Formadas por cerca de 275 quedas d’água, são consideradas uma das maiores maravilhas naturais do planeta e atraem milhares de turistas todos os anos, que podem percorrer trilhas, mirantes e passeios de barco que se aproximam das quedas.",
  },
  {
    id: "3",
    titulo: "Pelourinho",
    local: "Salvador - BA",
    imagem: IMAGENS.item3,
    imagemDetalhe: IMAGENS.detalhe3,
    descricaoCurta:
      "Centro histórico colorido de Salvador, Patrimônio Mundial da UNESCO.",
    descricaoLonga:
      "O Pelourinho é o centro histórico de Salvador, na Bahia, e foi declarado Patrimônio Mundial pela UNESCO. Suas ruas coloridas, igrejas barrocas e casarões coloniais contam a história do Brasil colonial, além de abrigar manifestações culturais como o axé, o samba de roda e a capoeira, que encantam visitantes do mundo inteiro.",
  },
  {
    id: "4",
    titulo: "Fernando de Noronha",
    local: "Pernambuco",
    imagem: IMAGENS.item4,
    imagemDetalhe: IMAGENS.detalhe4,
    descricaoCurta: "Arquipélago com praias paradisíacas e águas cristalinas.",
    descricaoLonga:
      "Fernando de Noronha é um arquipélago vulcânico localizado no oceano Atlântico, a cerca de 350 km da costa brasileira. Conhecido por suas praias paradisíacas, águas cristalinas e rica vida marinha, é um destino muito procurado para mergulho e ecoturismo, com regras rigorosas de preservação ambiental que limitam o número de visitantes.",
  },
  {
    id: "5",
    titulo: "Floresta Amazônica",
    local: "Amazonas",
    imagem: IMAGENS.item5,
    imagemDetalhe: IMAGENS.detalhe5,
    descricaoCurta:
      "A maior floresta tropical do mundo, com biodiversidade única.",
    descricaoLonga:
      "A Floresta Amazônica é a maior floresta tropical do mundo e ocupa grande parte da região Norte do Brasil. Com uma biodiversidade incomparável, abriga milhares de espécies de plantas e animais, além de rios caudalosos como o Amazonas, sendo essencial para o equilíbrio climático do planeta e para as comunidades que vivem na região.",
  },
];

/* ================================================================
   COMPONENTE DE IMAGEM
   ================================================================ */
function Imagem({ uri, altura }) {
  return (
    <Image
      source={{ uri }}
      style={{ width: "100%", height: altura }}
      resizeMode="cover"
    />
  );
}

/* ================================================================
   TELA INICIAL / MENU
   ================================================================ */
function TelaInicial({ onNavegar }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.tituloApp}>🌎 Guia Turístico</Text>
      <Text style={styles.subtitulo}>Entrega de Projeto — Expo Go</Text>

      <TouchableOpacity
        style={styles.botaoMenu}
        onPress={() => onNavegar("parte1")}
      >
        <Text style={styles.botaoMenuTexto}>Lista de Informações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoMenu}
        onPress={() => onNavegar("parte2")}
      >
        <Text style={styles.botaoMenuTexto}>Galeria com Descrições</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoMenu}
        onPress={() => onNavegar("parte3")}
      >
        <Text style={styles.botaoMenuTexto}>Formulário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================================================================
   LISTA
   ================================================================ */
function TelaLista({ onAbrirDetalhe, onVoltar }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onVoltar}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.tituloSecao}>Destinos Turísticos</Text>
      {DADOS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => onAbrirDetalhe(item)}
        >
          <Imagem uri={item.imagem} altura={160} />
          <View style={styles.cardConteudo}>
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Text style={styles.cardLocal}>{item.local}</Text>
            <Text style={styles.cardDescricao}>{item.descricaoCurta}</Text>
            <Text style={styles.cardLink}>Toque para ver mais →</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

/* ================================================================
   DETALHE
   ================================================================ */
function TelaDetalhe({ item, onVoltar, onVerTodos }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onVoltar}>
        <Text style={styles.voltar}>← Voltar para a lista</Text>
      </TouchableOpacity>

      <Imagem uri={item.imagemDetalhe} altura={220} />

      <Text style={styles.tituloSecao}>{item.titulo}</Text>
      <Text style={styles.cardLocal}>{item.local}</Text>
      <Text style={styles.textoLongo}>{item.descricaoLonga}</Text>

      <TouchableOpacity style={styles.botaoPrimario} onPress={onVerTodos}>
        <Text style={styles.botaoTexto}>Ver a galeria completa (Parte 2)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================================================================
   GALERIA
   ================================================================ */
function TelaGaleria({ onVoltar }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onVoltar}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.tituloSecao}>Galeria com Descrições</Text>

      {DADOS.map((item) => (
        <View key={item.id} style={styles.card}>
          <Imagem uri={item.imagemDetalhe} altura={200} />
          <View style={styles.cardConteudo}>
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Text style={styles.textoLongo}>{item.descricaoLonga}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/* ================================================================
   FORMULÁRIO
   ================================================================ */
function TelaFormulario({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [destino, setDestino] = useState("");
  const [cidade, setCidade] = useState("");

  const [estado, setEstado] = useState("SP");
  const [tipoPasseio, setTipoPasseio] = useState("praia");

  const [orcamento, setOrcamento] = useState(3000);
  const [pessoas, setPessoas] = useState(2);

  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [querNovidades, setQuerNovidades] = useState(true);

  const handleEnviar = () => {
    if (!nome.trim() || !email.trim() || !destino.trim() || !cidade.trim()) {
      Alert.alert("Atenção", "Preencha os 4 campos de texto.");
      return;
    }
    if (!aceitaTermos) {
      Alert.alert("Atenção", "É necessário aceitar os termos para continuar.");
      return;
    }
    Alert.alert(
      "Cadastro enviado! ✈️",
      `Nome: ${nome}\nE-mail: ${email}\nDestino: ${destino}\nCidade: ${cidade}\nEstado: ${estado}\nTipo: ${tipoPasseio}\nOrçamento: R$ ${orcamento.toFixed(0)}\nPessoas: ${pessoas}\nAceita termos: ${aceitaTermos ? "Sim" : "Não"}\nNovidades: ${querNovidades ? "Sim" : "Não"}`,
    );
  };

  const handleLimpar = () => {
    setNome("");
    setEmail("");
    setDestino("");
    setCidade("");
    setEstado("SP");
    setTipoPasseio("praia");
    setOrcamento(3000);
    setPessoas(2);
    setAceitaTermos(false);
    setQuerNovidades(true);
    Alert.alert("Formulário limpo", "Todos os campos foram restaurados.");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity onPress={onVoltar}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.tituloSecao}>Cadastro de Passeio</Text>

      <Text style={styles.label}>Nome completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Maria Silva"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: maria@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Destino desejado</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Fernando de Noronha"
        value={destino}
        onChangeText={setDestino}
      />

      <Text style={styles.label}>Cidade de origem</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: São Paulo"
        value={cidade}
        onChangeText={setCidade}
      />

      <Text style={styles.label}>Estado (UF)</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={estado} onValueChange={(v) => setEstado(v)}>
          <Picker.Item label="SP" value="SP" />
          <Picker.Item label="RJ" value="RJ" />
          <Picker.Item label="MG" value="MG" />
          <Picker.Item label="BA" value="BA" />
          <Picker.Item label="PR" value="PR" />
          <Picker.Item label="PE" value="PE" />
        </Picker>
      </View>

      <Text style={styles.label}>Tipo de passeio</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={tipoPasseio}
          onValueChange={(v) => setTipoPasseio(v)}
        >
          <Picker.Item label="Praia" value="praia" />
          <Picker.Item label="Serra / Ecoturismo" value="serra" />
          <Picker.Item label="Cidade histórica" value="cidade" />
          <Picker.Item label="Aventura" value="aventura" />
        </Picker>
      </View>

      <Text style={styles.label}>Orçamento: R$ {orcamento.toFixed(0)}</Text>
      <Slider
        minimumValue={0}
        maximumValue={10000}
        step={100}
        value={orcamento}
        onValueChange={setOrcamento}
        minimumTrackTintColor="#2f6fed"
        maximumTrackTintColor="#c7d2e5"
      />

      <Text style={styles.label}>Número de pessoas: {pessoas}</Text>
      <Slider
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={pessoas}
        onValueChange={setPessoas}
        minimumTrackTintColor="#2f6fed"
        maximumTrackTintColor="#c7d2e5"
      />

      <View style={styles.linhaSwitch}>
        <Text style={styles.labelSwitch}>Aceito os termos de uso</Text>
        <Switch value={aceitaTermos} onValueChange={setAceitaTermos} />
      </View>

      <View style={styles.linhaSwitch}>
        <Text style={styles.labelSwitch}>Quero receber novidades</Text>
        <Switch value={querNovidades} onValueChange={setQuerNovidades} />
      </View>

      <TouchableOpacity style={styles.botaoPrimario} onPress={handleEnviar}>
        <Text style={styles.botaoTexto}>Enviar Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={handleLimpar}>
        <Text style={styles.botaoSecundarioTexto}>Limpar Campos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================================================================
   APP — controle de telas
   ================================================================ */
export default function App() {
  const [tela, setTela] = useState("home");
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const abrirDetalhe = (item) => {
    setItemSelecionado(item);
    setTela("detalhe");
  };

  return (
    <SafeAreaView style={styles.app}>
      {tela === "home" && <TelaInicial onNavegar={setTela} />}

      {tela === "parte1" && (
        <TelaLista
          onAbrirDetalhe={abrirDetalhe}
          onVoltar={() => setTela("home")}
        />
      )}

      {tela === "detalhe" && itemSelecionado && (
        <TelaDetalhe
          item={itemSelecionado}
          onVoltar={() => setTela("parte1")}
          onVerTodos={() => setTela("parte2")}
        />
      )}

      {tela === "parte2" && <TelaGaleria onVoltar={() => setTela("home")} />}

      {tela === "parte3" && <TelaFormulario onVoltar={() => setTela("home")} />}
    </SafeAreaView>
  );
}

/* ================================================================
   ESTILOS
   ================================================================ */
const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: "#f2f4f7" },
  container: { padding: 16, paddingBottom: 48 },

  tituloApp: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2a44",
    textAlign: "center",
    marginTop: 24,
  },
  subtitulo: {
    fontSize: 14,
    color: "#5a6478",
    textAlign: "center",
    marginBottom: 24,
  },

  tituloSecao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2a44",
    marginVertical: 12,
  },

  voltar: {
    color: "#2f6fed",
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 4,
  },

  botaoMenu: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#2f6fed",
    elevation: 2,
  },
  botaoMenuTexto: { fontSize: 16, fontWeight: "600", color: "#1f2a44" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  cardConteudo: { padding: 14 },
  cardTitulo: { fontSize: 18, fontWeight: "bold", color: "#1f2a44" },
  cardLocal: { fontSize: 13, color: "#5a6478", marginTop: 2, marginBottom: 6 },
  cardDescricao: { fontSize: 14, color: "#38425a", lineHeight: 20 },
  cardLink: { marginTop: 10, color: "#2f6fed", fontWeight: "700" },
  textoLongo: {
    fontSize: 15,
    color: "#38425a",
    lineHeight: 23,
    marginTop: 8,
    textAlign: "justify",
  },

  imagemVazia: {
    width: "100%",
    backgroundColor: "#dfe5ee",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#b8c3d6",
  },
  imagemVaziaTexto: { color: "#7a869c", fontSize: 13 },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#38425a",
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d3dae6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },

  pickerWrapper: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d3dae6",
    borderRadius: 10,
    overflow: "hidden",
  },

  linhaSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#d3dae6",
  },
  labelSwitch: { fontSize: 15, color: "#38425a", flex: 1 },

  botaoPrimario: {
    backgroundColor: "#2f6fed",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  botaoSecundario: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#2f6fed",
  },
  botaoSecundarioTexto: { color: "#2f6fed", fontSize: 16, fontWeight: "bold" },
});
