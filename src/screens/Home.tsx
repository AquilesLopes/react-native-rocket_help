import { useNavigation } from '@react-navigation/native';
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native'
import React, { useState } from 'react';
import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';



export function Home() {

    const navigation = useNavigation();

    const { colors } = useTheme();

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '1',
            patrimony: '12345',
            when: '18/07/2022 às 18:00',
            status: 'open',
        },
        {
            id: '2',
            patrimony: '4324',
            when: '17/07/2022 às 16:00',
            status: 'open',
        },
        {
            id: '3',
            patrimony: '4234',
            when: '15/07/2022 às 19:00',
            status: 'closed',
        },
        {id: '4', patrimony: '423', when: '15/07/2022 às 19:00', status: 'closed'},
        {id: '5', patrimony: '6546', when: '15/07/2022 às 19:00', status: 'open'},
        {id: '6', patrimony: '7658', when: '15/07/2022 às 19:00', status: 'open'},
        {id: '7', patrimony: '887', when: '15/07/2022 às 19:00', status: 'closed'},
        {id: '8', patrimony: '8787', when: '15/07/2022 às 19:00', status: 'open'}
    ]);

    function handleNewOrder() {
        navigation.navigate('new');
    }

    function handleOpenDetails(orderId: string) {
        navigation.navigate('details', {'orderId': orderId});
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />

                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                />
            </HStack>

            <VStack flex={1} px={5}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100" >
                       Solicitações
                    </Heading>
                    <Text color="gray.200">
                       {orders.length}
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter
                        type="open"
                        title="Abertos"
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        type="closed"
                        title="Fechados"
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center >
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                                
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Nenhum chamado encontrado
                            </Text>
                        </Center>
                    )}
                />

                <Button title="Nova solicitação" onPress={handleNewOrder} />
            </VStack>


        </VStack>
    );
}