import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native'
import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
  id: string,
  skill: string
}

export function Home() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<SkillData[]>([])
  const [greetings, setGreetings] = useState('')

  function handleAddSkill() {
    const data = {
      id: String(new Date().getTime()),
      skill: newSkill
    }
    setMySkills([...mySkills, data])
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id))
  }

  useEffect(() => {
    const currentHour = new Date().getHours()

    if (currentHour >= 6 && currentHour < 12) {
      setGreetings('Good Morning')
    } else if (currentHour >= 12 && currentHour < 19) {
      setGreetings('Good Morning')
    } else if (currentHour >= 19 || currentHour < 6) {
      setGreetings('Good Morning')
    }

  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Welcome, Lucas</Text>
      <Text style={styles.greetings} >{greetings}</Text>
      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill} />
      <Button title="Add" onPress={handleAddSkill} />
      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>
      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <SkillCard skill={item.skill} onPress={() => handleRemoveSkill(item.id)} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8
  }
})
